import { EventApi, EventClickArg } from "@fullcalendar/core";

export function renderPopup(arg: EventClickArg) {
    // TODO: change ids
    setModalText(arg.event);
    addListenersIfNeeded();
    showModal();
}

function setModalText(event: EventApi) {
    // TODO:
}

var listenersAdded = false;
function addListenersIfNeeded() {
    if (!listenersAdded) {
        hideModalOnCloseClick();
        hideModalOnOutsideClick();
    }
    listenersAdded = true;
}

function hideModalOnCloseClick() {
    // Get the <span> element that closes the modal
    var span: HTMLElement = document.getElementsByClassName("close")[0] as HTMLElement;
    if (!span) {
        throw new Error("Could not find close button");
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = hideModal;
}

function hideModalOnOutsideClick() {
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event: any) => {
        if (getModal() && event.target == getModal()) {
            hideModal();
        }
    }
}

function showModal() {
    getModal().style.display = "block";
}

function hideModal() {
    getModal().style.display = "none";
}

var modal: HTMLElement | null;
function getModal(): HTMLElement {
    if (!modal) {
        modal = document.getElementById("popupModal");
    }
    if (!modal) {
        throw new Error("Did not find modal");
    }
    return modal;
}