import { CalendarConfig } from './config/CalendarConfig';
import { renderCalendar } from './render/RenderCalendar';
import './style/main.css';

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
