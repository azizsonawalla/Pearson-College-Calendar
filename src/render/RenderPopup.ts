import { EventClickArg } from "@fullcalendar/core";

export function renderPopup(arg: EventClickArg) {
    var modal = document.getElementById("myModal");
    if (!modal) return;
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span: HTMLElement = document.getElementsByClassName("close")[0] as HTMLElement;

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        if (!modal) return;
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event: any) {
        if (modal && event.target == modal) {
            modal.style.display = "none";
        }
    }
}