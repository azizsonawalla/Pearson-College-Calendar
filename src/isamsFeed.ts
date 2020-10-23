export class isamsFeed {
    public static readLatest() {
        var x = new XMLHttpRequest();
        x.open("GET", "https://isams.pearsoncollege.ca/system/api/feeds/calendar.ashx");
        x.onreadystatechange = function () {
          if (x.readyState == 4 && x.status == 200) {
            var doc = x.responseXML;
            console.log(doc);
          }
        };
        x.send();
        return {};
    }
}