import { PearsonCalendarEvent } from "../types/PearsonCalendarEvent";

/**
 * A parser to translate iSAMs' XML calendar feed
 * to FullCalendarEvents
 */
export class ISAMSFeedParser {

    private static NO_VAL: string = "NO VALUE AVAILABLE";

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

    public static parse(xml: XMLDocument): PearsonCalendarEvent[] {
        const feedEvents: HTMLCollectionOf<Element> = xml.getElementsByTagName(this.XMLTags.EVENT);
        const parsedEvents: PearsonCalendarEvent[] = [];
        for (let i=0; i < feedEvents.length; i++) {
          const parsedEvent = this.parseEvent(feedEvents.item(i) as HTMLElement);
          if (parsedEvent) {
            parsedEvents.push(parsedEvent);
          }
        }
        return parsedEvents;
    }

    private static parseEvent(event: HTMLElement): PearsonCalendarEvent | null {
      try {
        return {
          id: this.getTextValueOfElementWithTag(event, this.XMLTags.ID) || this.NO_VAL,
          groupId: this.getTextValueOfElementWithTag(event, this.XMLTags.CATEGORY) || this.NO_VAL,
          allDay: this.getBooleanValueOfElementWithTag(event, this.XMLTags.ALL_DAY),
          start: this.parseStart(event),
          end: this.parseEnd(event),
          title: this.getTextValueOfElementWithTag(event, this.XMLTags.DESCRIPTION) || this.NO_VAL,
          editable: false,
          extendedProps: {
              location: this.getTextValueOfElementWithTag(event, this.XMLTags.LOCATION),
              notes: this.getTextValueOfElementWithTag(event, this.XMLTags.NOTES),
          },
        }
      } catch (e) {
        console.log(`Failed to parse event from ${event}: ${e}`);
        return null;
      }
    }

    private static parseStart(event: HTMLElement): Date {
      const startDate = this.getTextValueOfElementWithTag(event, this.XMLTags.START_DATE);
      const startTime = this.getTextValueOfElementWithTag(event, this.XMLTags.START_TIME);

      if (!startDate) {
        throw new Error("Event element is missing start date");
      }
      return new Date(this.buildDateTimeString(startDate, startTime));
    }

    private static parseEnd(event: HTMLElement): Date | undefined {
      const endDate = this.getTextValueOfElementWithTag(event, this.XMLTags.END_DATE);
      const endTime = this.getTextValueOfElementWithTag(event, this.XMLTags.END_TIME);

      if (!endDate) {
        return undefined;
      }
      return new Date(this.buildDateTimeString(endDate, endTime));
    }

    private static buildDateTimeString(dateUKFormat: string, time?: string): string {
      const dateParts = dateUKFormat.split("/");
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];

      /**
       * TODO: Should the times in the calendar change depending on user's local time?
       * Dynamic time might mess-up during daylight savings?
       * 
       * - To make the times adapt to local time, use '-7' after time below.
       * - To keep times fixed, use '+0' instead below and add 'timeZone: Americas/Vancouver' 
       *   to Calendar properties
       */
      const parsedTime = time ? `${time}+0` : ``;

      return `${month}-${day}-${year} ${parsedTime}`;
    }

    private static getBooleanValueOfElementWithTag(element: HTMLElement, tag: string): boolean {
      const textVal = this.getTextValueOfElementWithTag(element, tag);
      return (textVal != null && textVal.toLowerCase() === 'true') ? true: false;
    }

    private static getTextValueOfElementWithTag(element: HTMLElement, tag: string): string | undefined {
      try {
        return element.getElementsByTagName(tag)[0].textContent || undefined;
      } catch (e) {
        return undefined;
      }
    }
}