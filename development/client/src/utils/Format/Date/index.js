const dateParser = (date) => {
  if (date.toString().includes(".000Z"))
    return new Date(date.replace("T", " ").slice(0, 19));
  return new Date(date);
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatHoursMinutes = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatWeekday = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    weekday: "long",
  }).format(new Date(date));
};

export const formatMilliseconds = (date) => {
  return new Date(date).getTime();
};

export const formatDateForCalendar = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};
