import { FullCalendarEvent } from "./FullCalendarEvent";

enum XMLTags {
    ROOT = "iSAMS",
    CALENDAR_MANAGER = "iSAMS_CALENDARMANAGER",
    EVENT = "event",
    ID = "id",
    START_DATE = "startdate",
    START_TIME = "starttime",
    END_DATE = "enddate",
    END_TIME = "endtime",
    ALL_DAY = "alldayevent",
    DESCRIPTION = "description",
    CATEGORY = "category",
    LOCATION = "location",
    NOTES = "notes",
    SUBMIT_BY = "submitby",
    SUBMIT_DATE = "submitdate"
}

/**
 * A parser to translate iSAMs' XML calendar feed
 * to FullCalendarEvents
 */
export class isamsFeedParser {

    public static parse(xml: XMLDocument): FullCalendarEvent[] {
        // TODO: implement this
        throw new Error("Not implemented");
    }
}