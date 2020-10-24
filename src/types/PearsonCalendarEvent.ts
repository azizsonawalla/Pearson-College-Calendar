import { EventInput } from "@fullcalendar/core";


// TODO: re-assign compulsary props

export interface PearsonCalendarEvent extends EventInput {
    id: string;
    groupId: string;
    allDay: boolean;
    start: Date;
    end?: Date;
    title: string;
    editable: boolean;
    extendedProps: {
        location?: string;
        notes?: string;
    };
}
