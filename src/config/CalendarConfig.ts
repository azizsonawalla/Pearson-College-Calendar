/**
 * Configuration for the program.
 * 
 * These are the 'knobs and dials' of the program extracted here for ease of tweaking and customizing.
 * While most of these can be changed without worry, make sure to read the notes above each one and 
 * understand the change that you are making. 
 */
export class CalendarConfig {

  public static GeneralConfig = class {

    /**
     * The date that the calendar should open on to when
     * first started.
     */
    public static INITIAL_DATE: Date = new Date(); // open on to today's date

    /**
     * When set to 'false', the calendar disables user controls to edit the events in the calendar.
     * i.e. the user won't be able to drag the events around to change dates.
     *
     * Note: switching this to 'true' will not automatically update the events in the source
     * feed (i.e. iSAMS). To send user changes back to iSAMs requires adding a handler to the
     * date change event that pushes changes back to iSAMS.
     */
    public static CALENDAR_IS_EDITABLE: boolean = false;

    /**
     * When set to 'true', the user can click on the names of the days to navigate to
     * that specific day (in day/week view only).
     */
    public static ENABLE_NAV_LINKS_ON_DAY_NAMES: boolean = true;

    /**
     * When set to 'true', collapse events into 'X+ more' link when too many events to fit in view.
     * When set to 'false', all events will be shown by 'stretching' the cell in the calendar to
     * make them all fit
     */
    public static COLLAPSE_EVENTS_TO_MORE_LINK: boolean = true;

  };

  public static HeaderConfig = class {

    /**
     * Controls to show on the left side in the header.
     * prev = previous button (left arrow)
     * next = next button (right arrow)
     * today = today button (takes you to today's date)
     *
     * To remove space between buttons, replace the space in the string below with a comma (,).
     * Eg. 'prev,next today' will remove the space between the left and right arrow buttons
     */
    public static LEFT_CONTROLS: string = 'prev next today';

    /**
     * Controls to show in the center of the header toolbar
     * title = name of the month/week/day currently being viewed
     */
    public static CENTER_CONTROLS: string = 'title';

    /**
     * Controls to show on the right side of the header toolbar
     * dayGridMonth = a button to switch to month-view in grid style
     * timeGridWeek =  a button to switch to week-view in grid style
     * timeGridDay =  a button to switch to day-view
     * listWeek =  a button to switch to list-view
     *
     * To add space between buttons, replace the comma in the string below with a space (" ").
     * Eg. 'dayGridMonth timeGridWeek,timeGridDay,listWeek' will add a space between the first two buttons
     */
    public static RIGHT_CONTROLS: string = 'dayGridMonth timeGridWeek timeGridDay listWeek';

  };

  /**
   * WARNING: Changing these without proper care will probably break the program!
   */
  public static ImplementationConfig = class {

    /**
     * The HTML id of the div in the DOM where the calendar should be inserted
     */
    public static CALENDAR_DIV_ID: string = 'calendar';

    /**
     * The DOM event to bind the render function to.
     */
    public static EVENT_NAME_FOR_RENDER_LISTENER: string = 'DOMContentLoaded';
  };
}
