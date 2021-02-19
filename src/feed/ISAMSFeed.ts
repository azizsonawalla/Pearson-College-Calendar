import { Config } from "../config/Config";
import {Cache} from "./Cache"

export class ISAMSFeed {

    /**
     * This is the URL that the app will first attempt to retrieve the feed from.
     * Currently, this is a Microsoft Azure Function App that acts as a proxy to the
     * iSAMS feed to bypass CORS errors.
     */
    private static PRIMARY_URL = "https://pearsoncollegeproxy.azurewebsites.net/isams-calendar";

    private static BACKUP_URL = null; // No backup URL right now

    public static async read(start?: Date, end?: Date): Promise<XMLDocument> {
        return this.getFromCache(start, end)                     // try cache first
        .catch(() => {                                           // if not in cache
            return this.fetchFromISAMS(start, end)                   // fetch from feed
            .then(dataFromUrl => {                               // store in cache
                this.writeToCache(dataFromUrl, start, end)
                return dataFromUrl
            })
        })
    }

    private static async fetchFromISAMS(start?: Date, end?: Date): Promise<XMLDocument> {
        const queryUrl = this.buildQueryUrl(this.PRIMARY_URL, start, end, false);
        console.log(`Fetching from ${queryUrl}`);
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200) {
                    resolve(new DOMParser().parseFromString(req.responseText, "text/xml"));
                    return;
                } else if (req.readyState === 4 && req.status !== 200) {
                    reject(`Request to feed failed: ${req.responseText}`);
                    return;
                }
            };
            req.open('GET', queryUrl, true);
            req.send();
        });
    }

    private static buildQueryUrl(domain: string, start?: Date, end?: Date, encodeParams?: boolean): string {
        let params = "";
        if (start || end) {
            params += "?";
        }
        if (start) {
            params += `date=${start.toLocaleDateString('en-GB')}`;
            if (end) {
                params += "&";
            }
        }
        if (end) {
            params += `endDate=${end.toLocaleDateString('en-GB')}`;
        }
        return domain + (encodeParams ? encodeURIComponent(params) : params);
    }

    private static hash(start?: Date, end?: Date): string { 
        let hash = `${start != null ? start.toISOString() : ""}_${end != null ? end.toISOString() : ""}`
        return hash
    }

    /**
     * Checks if data for query url exists in cache. If so, returns a promise that will
     * resolve with data. If not, promise will reject.
     * @param queryUrl query url for which to check cache
     */
    private static getFromCache(start?: Date, end?: Date): Promise<XMLDocument> {
        const key = this.hash(start, end)
        console.log(`Checking in cache`)
        const cachedValue = Cache.getCacheEntry(key)
        if (cachedValue != null) {
            const cachedXML = new DOMParser().parseFromString(cachedValue, "text/xml");
            console.log(`Found value in cache`)
            return Promise.resolve(cachedXML);
        }
        console.log(`No data found in cache`)
        return Promise.reject(`Cached value does not exist for ${key}`)
    }

    private static writeToCache(data: XMLDocument, start?: Date, end?: Date) {
        const key = this.hash(start, end)
        const dataAsString = new XMLSerializer().serializeToString(data);
        console.log(`Storing entries in cache`)
        Cache.newCacheEntry(key, dataAsString, Config.GeneralConfig.CACHE_ENTRY_TTL);
    }
}