export interface FullCalendarEvent {
    id: string;
    groupId?: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    title: string;
    url: string;
    editable: string;
    extendedProps: {
        location?: string;
        category: string;
        notes?: string;
    };
}
