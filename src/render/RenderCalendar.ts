import { Calendar, PluginDef, ToolbarInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { PearsonCalendarEvent } from "../types/PearsonCalendarEvent";
import { ISAMSFeed } from "../feed/ISAMSFeed";
import { ISAMSFeedParser } from "../feed/ISAMSFeedParser";
import { Config } from "../config/Config";
import { renderPopup } from "./RenderPopup";

/**
 * Grabs the reference to the div with id 'calendar' in the HTML DOM
 */
function getCalendarHTMLElement(): HTMLElement {
  const calendarElement: HTMLElement = document.getElementById(
    Config.ImplementationConfig.CALENDAR_DIV_ID
  )!;
  if (!calendarElement) {
    throw new Error(
      "Could not find Calendar element: HTML DOM needs to contain a div with id 'calendar'"
    );
  }
  return calendarElement;
}

/**
 * Retrieves the events to render on the calendar
 */
function getEvents(): PearsonCalendarEvent[] {
  const xmlFeed: XMLDocument = ISAMSFeed.readLatest();
  return ISAMSFeedParser.parse(xmlFeed);
}

/**
 * Returns an array of the plugins required to render the calendar
 */
function getPlugins(): PluginDef[] {
  return [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin];
}

/**
 * Builds and returns the configuration object for the header toolbar
 */
function getHeaderToolbarConfig(): ToolbarInput {
  return {
    left: Config.HeaderConfig.LEFT_CONTROLS,
    center: Config.HeaderConfig.CENTER_CONTROLS,
    right: Config.HeaderConfig.RIGHT_CONTROLS,
  };
}

function getCalendarStyle(): {} {
  // TODO
  return {};
}

/**
 * Builds the Calendar object with the given configuration
 * @param calendarElement reference to the div element in the DOM 
 *                        where the calendar will be rendered.
 */
function buildCalendarObject(calendarElement: HTMLElement): Calendar {
  return new Calendar(calendarElement, {
    nowIndicator: true,
    plugins: getPlugins(),
    headerToolbar: getHeaderToolbarConfig(),
    initialDate: Config.GeneralConfig.INITIAL_DATE,
    navLinks: Config.GeneralConfig.ENABLE_NAV_LINKS_ON_DAY_NAMES,
    editable: Config.GeneralConfig.CALENDAR_IS_EDITABLE,
    dayMaxEvents: Config.GeneralConfig.COLLAPSE_EVENTS_TO_MORE_LINK,
    events: getEvents(),
    eventClick: renderPopup,
    ... getCalendarStyle()
  });
}

/**
 * Renders the calendar
 */
export function renderCalendar() {
  let calendarElement: HTMLElement = getCalendarHTMLElement();
  let calendar = buildCalendarObject(calendarElement);
  calendar.render();
}
