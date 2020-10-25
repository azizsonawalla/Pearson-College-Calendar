import { Config } from "./config/Config";
import { renderCalendar } from "./render/RenderCalendar";
import "./style/main.css";

/**
 * Binds the rendering of the calendar to the configured DOM event
 */
function addListenerToEvent() {
  document.addEventListener(
    Config.ImplementationConfig.EVENT_NAME_FOR_RENDER_LISTENER,
    renderCalendar
  );
}

/**
 * Entry-point for rendering the calendar
 */
addListenerToEvent();
