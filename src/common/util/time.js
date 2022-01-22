
export function ParseMonth(month) {
  switch (month) {
    case 1: return "Jan";
    case 2: return "Feb";
    case 3: return "Mar";
    case 4: return "Apr";
    case 5: return "May";
    case 6: return "Jun";
    case 7: return "Jul";
    case 8: return "Aug";
    case 9: return "Sep";
    case 10: return "Oct";
    case 11: return "Nov";
    case 12: return "Dec";
    default: return "";
  }
}

export function ParsePostTime(t) {
  let timestamp = Date.parse(new Date());
  let diff = (timestamp / 1000 - t / 1000000000).toFixed(0)
  if (diff < 10) {
    return "just now"
  } else if (diff < 60) {
    return diff + "s"
  } else if (diff < 3600) {
    diff = (diff / 60).toFixed(0)
    return diff + "m"
  } else if (diff < 86400) {
    diff = (diff / 3600).toFixed(0)
    return diff + "h"
  } else if (diff < 259200) {
    diff = (diff / 86400).toFixed(0)
    return diff + "d"
  } else {
    let timestamp = (t / 1000000).toFixed(0);
    let newDate = new Date(timestamp);
    let yearNow = newDate.getFullYear()
    newDate.setTime(timestamp);
    let month = Number(newDate.getMonth()) + Number(1)
    let date = newDate.getDate()
    let m = ParseMonth(month)
    let d = ""
    let year = newDate.getFullYear()
    if (year < yearNow) {
      d = m + " " + date + ", " + year
    } else {
      d = m + " " + date
    }
    return d
  }
}

export function ParseDate(t) {
  let timestamp = (t * 1000);
  let newDate = new Date();
  newDate.setTime(timestamp);
  let month = Number(newDate.getMonth()) + Number(1)
  let date = newDate.getDate()
  let m = ParseMonth(month)
  let d = ""
  let year = newDate.getFullYear()
  d = m + " " + date + ", " + year
  return d
}

export function ParsePostDateTime(t) {
  let timestamp = (t / 1000000).toFixed(0);
  let newDate = new Date();
  let yearNow = newDate.getFullYear()
  newDate.setTime(timestamp);
  let month = Number(newDate.getMonth()) + Number(1)
  let date = newDate.getDate()
  let m = ParseMonth(month)
  let d = ""
  let hr = newDate.getHours() + ':';
  let min = newDate.getMinutes() + ':';
  let sec = newDate.getSeconds();
  let year = newDate.getFullYear()
  if (year < yearNow) {
    d = hr + min + sec + " · " + m + " " + date + ", " + year
  } else {
    d = hr + min + sec + " · " + m + " " + date
  }
  return d
}