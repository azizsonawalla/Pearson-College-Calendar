export class ISAMSFeed {

    private static PRIMARY_HOST = "https://isams.pearsoncollege.ca/system/api/feeds/calendar.ashx";
    private static CORS_PROXY = "https://cors-anywhere.herokuapp.com";

    public static async read(start?: Date, end?: Date): Promise<XMLDocument> {
        const queryUrl = this.buildQueryUrl(start, end);
        console.log(`Querying ${queryUrl}`);
        // return this.fetchFromUrl(queryUrl)
        // .catch(e => {
        //     console.warn(`Fetch from primary url failed: ${e}`);
        //     console.info(`Fetching from proxy`);
        //     return this.fetchFromUrlViaProxy(queryUrl);
        // });
        return this.fetchFromUrlViaProxy(queryUrl);
    }

    private static buildQueryUrl(start?: Date, end?: Date): string {
        let queryUrl = this.PRIMARY_HOST;
        if (start || end) {
            queryUrl += "?";
        }
        if (start) {
            queryUrl += `date=${start.toLocaleDateString('en-GB')}`;
            if (end) {
                queryUrl += "&";
            }
        }
        if (end) {
            queryUrl += `endDate=${end.toLocaleDateString('en-GB')}`;
        }
        return queryUrl;
    }

    private static async fetchFromUrl(queryUrl: string): Promise<XMLDocument> {
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

    private static async fetchFromUrlViaProxy(queryUrl: string): Promise<XMLDocument> {
        const proxyUrl = `${this.CORS_PROXY}/${queryUrl}`
        return this.fetchFromUrl(proxyUrl);
    }
}