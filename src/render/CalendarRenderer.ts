import { Calendar, EventInput, PluginDef, ToolbarInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { ISAMSFeed } from "../feed/ISAMSFeed";
import { ISAMSFeedParser } from "../feed/ISAMSFeedParser";
import { Config } from "../config/Config";
import { getModalRenderer } from "./ModalRenderer";
import { LoaderRenderer } from "./LoaderRenderer"
import { Cache } from "../feed/Cache";

interface FetchArgs {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  timeZone: string;
}

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
async function fetchEvents(arg: FetchArgs, success: any, failureCallback: any): Promise<EventInput[]> {
  try {
    LoaderRenderer.showLoading();
    const xmlFeed: XMLDocument = await ISAMSFeed.read(arg.start, arg.end);
    const events = ISAMSFeedParser.parse(xmlFeed);
    success(events);
    LoaderRenderer.hideLoading();
    return Promise.resolve(events);
  } catch (e) {
    LoaderRenderer.showErrorMessage("Uh oh! Couldn't fetch calendar events.");
    failureCallback();
    return Promise.reject(e);
  }
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

/**
 * Builds and returns the configuration object for the footer toolbar
 */
function getFooterToolbarConfig(): ToolbarInput {
  return {
    right: "clearCache",
  };
}

function getCalendarStyle(): {} {
  // TODO
  return {};
}

function clearCacheAndRefreshPage() {
  Cache.clearCache()
  location.reload()
}

function getCacheRefreshButton() {
  return {
    clearCache: {
      text: 'Refresh',
      click: clearCacheAndRefreshPage
    }
  }
}

/**
 * Builds the Calendar object with the given configuration
 * @param calendarElement reference to the div element in the DOM 
 *                        where the calendar will be rendered.
 */
function buildCalendarObject(calendarElement: HTMLElement): Calendar {
  return new Calendar(calendarElement, {
    timeZone: 'UTC',
    nowIndicator: true,
    plugins: getPlugins(),
    headerToolbar: getHeaderToolbarConfig(),
    footerToolbar: getFooterToolbarConfig(),
    initialDate: Config.GeneralConfig.INITIAL_DATE,
    navLinks: Config.GeneralConfig.ENABLE_NAV_LINKS_ON_DAY_NAMES,
    editable: Config.GeneralConfig.CALENDAR_IS_EDITABLE,
    dayMaxEvents: Config.GeneralConfig.COLLAPSE_EVENTS_TO_MORE_LINK,
    events: fetchEvents,
    eventClick: getModalRenderer(),
    customButtons: {
      ...getCacheRefreshButton() 
    },
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
