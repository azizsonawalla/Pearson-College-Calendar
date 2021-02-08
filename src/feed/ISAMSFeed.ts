export class ISAMSFeed {

    /**
     * This is the URL that the app will first attempt to retrieve the feed from.
     * Currently, this is a Microsoft Azure Function App that acts as a proxy to the
     * iSAMS feed to bypass CORS errors.
     */
    private static PRIMARY_URL = "https://pearsoncollegeproxy.azurewebsites.net/isams-calendar";

    private static BACKUP_URL = null; // No backup URL right now

    public static async read(start?: Date, end?: Date): Promise<XMLDocument> {
        const queryUrl = this.buildQueryUrl(this.PRIMARY_URL, start, end, false);
        return this.fetchFromUrl(queryUrl)
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

    private static async fetchFromUrl(queryUrl: string): Promise<XMLDocument> {
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
}