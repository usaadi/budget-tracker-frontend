const dateTimeFormatter = (dateString) => {
  const date = new Date(dateString);
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const result = `${year}-${month}-${day} ${hour}:${minute}`;
  return result;
};

const shortDateFormatter = (dateString, locale = "en-us") => {
  const date = new Date(dateString);
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const day = date.getDate();
  const monthName = date.toLocaleString(locale, { month: "short" });

  const result = `${day} ${monthName} ${year}`;
  return result;
};

const timeFormatter = (dateString, locale = "en-us") => {
  const date = new Date(dateString);
  const timeString = date.toLocaleTimeString(locale, {
    timeStyle: "short",
  });
  return timeString;
};

const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  const strMonth = date.getUTCMonth() + 1;
  const strYear = date.getUTCFullYear();
  const strDate = `${strMonth}/${strYear}`;
  return strDate;
};

const getRangeFromMonth = (dateString) => {
  const date = new Date(dateString);
  const fromDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
  const toDate = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
  toDate.setUTCHours(23, 59, 59, 999);
  return { fromDate, toDate };
};

export {
  dateTimeFormatter,
  shortDateFormatter,
  timeFormatter,
  getMonthYear,
  getRangeFromMonth,
};
