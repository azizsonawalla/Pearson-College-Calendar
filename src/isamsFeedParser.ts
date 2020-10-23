import { FullCalendarEvent } from "./FullCalendarEvent";

/**
 * A parser to translate iSAMs' XML calendar feed
 * to FullCalendarEvents
 */
export class ISAMSFeedParser {

    private static XMLTags = {
        ROOT: "iSAMS",
        CALENDAR_MANAGER: "iSAMS_CALENDARMANAGER",
        EVENT: "event",
        ID: "id",
        START_DATE: "startdate",
        START_TIME: "starttime",
        END_DATE: "enddate",
        END_TIME: "endtime",
        ALL_DAY: "alldayevent",
        DESCRIPTION: "description",
        CATEGORY: "category",
        LOCATION: "location",
        NOTES: "notes",
        SUBMIT_BY: "submitby",
        SUBMIT_DATE: "submitdate"
    }

    public static parse(xml: XMLDocument): FullCalendarEvent[] {
        return [{
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          },
          {
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          },
          {
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          },
          {
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          },
          {
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          },
          {
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          },
          {
            title: "Test Event",
            start: new Date(),
            allDay: true,
            id: '1'
          }];
    }
}