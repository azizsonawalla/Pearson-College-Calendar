import { EventInput } from "@fullcalendar/core";


// TODO: re-assign compulsary props

export interface FullCalendarEvent extends EventInput {
    id: string;
    groupId?: string;
    allDay?: boolean;
    start: Date;
    end?: Date;
    title?: string;
    url?: string;
    editable?: boolean;
    extendedProps?: {
        location?: string;
        category: string;
        notes?: string;
    };
}
