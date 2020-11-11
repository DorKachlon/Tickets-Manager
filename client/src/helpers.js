function addZero(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}

export function convertDate(creationTime) {
  const d = new Date(creationTime);
  const m = addZero(d.getMinutes());
  let h = d.getHours();
  let amPm = "PM";
  if (h > 12) {
    h -= 12;
    amPm = "PM";
  } else if (h < 12) {
    amPm = "AM";
  }
  const s = addZero(d.getSeconds());
  let today = d;
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  today = `${dd}/${mm}/${yyyy}`;
  return `${today}, ${h}:${m}:${s} ${amPm}`;
}
