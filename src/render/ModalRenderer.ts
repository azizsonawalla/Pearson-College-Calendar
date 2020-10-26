import { EventApi, EventClickArg } from "@fullcalendar/core";

let modal: HTMLElement | null;

export function getModalRenderer(): {(arg: EventClickArg): void} {
    addListeners();
    return renderModal;
}

function renderModal(arg: EventClickArg) {
    try {
        // TODO: change ids
        setModalText(arg.event);
        showModal();
    } catch (e) {
        console.log(`Failed to render popup: ${e}`);
    }
}

function setModalText(event: EventApi) {
    // TODO:
    setModalTitle(event?.title);
    setModalDate(event?.start, event?.end);
    setModalTime(event?.start, event?.end, event?.allDay);
    setModalLocation(event?.extendedProps?.location);
    setModalCategory(event?.groupId);
    setModalNotes(event?.extendedProps?.notes);
}

function setModalDate(start: Date | null, end: Date | null) {
    let dateString;
    if (start) {
        if (end && end !== start) {
            dateString = dateRangeToDateString(start, end);
        } else {    
            dateString = dateObjToDateString(start);
        }
    }
    const dateNode = document.getElementById("date-prop");
    if (!dateNode) {
        throw new Error("Could not find date node");
    }
    dateNode.innerText = dateString || "-";
}

function dateRangeToDateString(start: Date, end: Date): string {
    return `${dateObjToDateString(start)} to ${dateObjToDateString(end)}`;
}

function dateObjToDateString(date: Date): string {
    return date.toLocaleDateString(
        "en-US", {
            timeZone: 'America/Vancouver', 
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    );
}

function setModalTime(start: Date | null, end: Date | null, allDay: boolean) {
    let timeString;
    if (start) {
        if (allDay) {
            timeString = "All day";
        } else if (end) {
            timeString = dateRangeToTimeString(start, end);
        } else {    
            timeString = dateObjToTimeString(start);
        }
    }
    const timeNode = document.getElementById("time-prop");
    if (!timeNode) {
        throw new Error("Could not find time node");
    }
    timeNode.innerText = timeString || "-";
}

function dateRangeToTimeString(start: Date, end: Date): string {
    return `${dateObjToTimeString(start)}-${dateObjToTimeString(end)}`;
}

function dateObjToTimeString(date: Date): string {
    const fullTime = date.toLocaleTimeString(
        "en-US",
        {
            timeZone: 'GMT'   // the date object is timezone agnostic, so we fix it to GMT
        }
    );
    return removeSecondsFromTimeString(fullTime);
}

function removeSecondsFromTimeString(time: string): string {
    const am: boolean = time.toLowerCase().indexOf("am") > 0;
    const secondsRemoved = time.split(":").slice(0, 2).join(":");
    return `${secondsRemoved}${am ? `a`: `p`}`;
}

function setModalLocation(location: string) {
    const locationNode = document.getElementById("location-prop");
    if (!locationNode) {
        throw new Error("Could not find location node");
    }
    locationNode.innerText = location || "-";
}

function setModalCategory(category: string) {
    const categoryNode = document.getElementById("category-prop");
    if (!categoryNode) {
        throw new Error("Could not find category node");
    }
    categoryNode.innerText = category || "-";
}

function setModalNotes(notes: string) {
    const notesNode = document.getElementById("notes-prop");
    if (!notesNode) {
        throw new Error("Could not find notes node");
    }
    notesNode.innerText = notes || "-";
}

function setModalTitle(title: string) {
    const titleNode = document.getElementById("modal-title");
    if (!titleNode) {
        throw new Error("Could not find title node");
    }
    titleNode.innerText = title;
}

function addListeners() {
    hideModalOnCloseClick();
    hideModalOnOutsideClick();
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

function getModal(): HTMLElement {
    if (!modal) {
        modal = document.getElementById("popupModal");
    }
    if (!modal) {
        throw new Error("Did not find modal");
    }
    return modal;
}