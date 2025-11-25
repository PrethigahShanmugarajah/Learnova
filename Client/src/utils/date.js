// Learnova / Client / src / utils / date.js

/* -------- DD/MM/YYYY -------- */
export const formatDDMMYYYY = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/* -------- DD/MM/YYYY hh:mm:ss AM/PM -------- */
export const formatDDMMYYYYWithTimeAMPM = (date) => {
  const d = new Date(date);

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // convert 0 => 12
  hours = hours.toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
};
