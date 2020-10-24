import {TEST_FEED} from './testFeed';

export class ISAMSFeed {
    public static readLatest(): XMLDocument {
        // TODO: workaround from local file for now
        // get feed from isams
        return new DOMParser().parseFromString(TEST_FEED, "text/xml");
    }
}