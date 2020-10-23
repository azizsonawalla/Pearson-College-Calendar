import { Calendar, PluginDef, ToolbarInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {FullCalendarEvent} from './FullCalendarEvent';
import {ISAMSFeed} from './ISAMSFeed';
import {ISAMSFeedParser} from './ISAMSFeedParser';
import { CalendarConfig } from './CalendarConfig';
import './main.css';

/**
 * Grabs the reference to the div with id 'calendar' in the HTML DOM
 */
function getCalendarHTMLElement(): HTMLElement {
  const calendarElement: HTMLElement = document.getElementById(CalendarConfig.ImplementationConfig.CALENDAR_DIV_ID)!;
  if (!calendarElement) {
    throw new Error("Could not find Calendar element: HTML DOM needs to contain a div with id 'calendar'");
  }
  return calendarElement;
}

/**
 * Retrieves the events to render on the calendar
 */
function getEvents(): FullCalendarEvent[] {
  const xmlFeed: XMLDocument = ISAMSFeed.readLatest();
  return ISAMSFeedParser.parse(xmlFeed);
}

/**
 * Returns an array of the plugins required to render the calendar
 */
function getPlugins(): PluginDef[] {
  return [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ];
}

/**
 * Builds and returns the configuration object for the header toolbar
 */
function getHeaderToolbarConfig(): ToolbarInput {
  return {
    left: CalendarConfig.HeaderConfig.LEFT_CONTROLS,
    center:  CalendarConfig.HeaderConfig.CENTER_CONTROLS,
    right:  CalendarConfig.HeaderConfig.RIGHT_CONTROLS
  }
}

/**
 * Builds the Calendar object with the given configuration
 * @param calendarElement reference to the div element in the DOM where the calendar
 *                   will be rendered.
 */
function buildCalendarObject(calendarElement: HTMLElement): Calendar {
  /* TODO: tooltips  -https://fullcalendar.io/docs/event-tooltip-demo */
  return new Calendar(
    calendarElement, 
    {
      timeZone: 'PDT',
      aspectRatio: 1,
      plugins: getPlugins(),
      headerToolbar: getHeaderToolbarConfig(),
      initialDate: CalendarConfig.GeneralConfig.INITIAL_DATE,
      navLinks: CalendarConfig.GeneralConfig.ENABLE_NAV_LINKS_ON_DAY_NAMES,
      editable: CalendarConfig.GeneralConfig.CALENDAR_IS_EDITABLE,
      dayMaxEvents: CalendarConfig.GeneralConfig.COLLAPSE_EVENTS_TO_MORE_LINK,
      events: getEvents()
    }
  );
}

/**
 * Renders the calendar
 */
function renderCalendar() {
  let calendarElement: HTMLElement = getCalendarHTMLElement();
  let calendar = buildCalendarObject(calendarElement);
  calendar.render();
}

/**
 * Binds the rendering of the calendar to the configured DOM event
 */
function addListenerToEvent() {
  document.addEventListener(
    CalendarConfig.ImplementationConfig.EVENT_NAME_FOR_RENDER_LISTENER, 
    renderCalendar
  );
}

/**
 * Entry-point for rendering the calendar
 */
addListenerToEvent();
