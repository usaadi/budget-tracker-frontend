const dateTimeFormatter = (dateString) => {
  const date = new Date(dateString);
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
  const strMonth = date.getMonth() + 1;
  const strYear = date.getFullYear();
  const strDate = `${strMonth}/${strYear}`;
  return strDate;
};

export { dateTimeFormatter, shortDateFormatter, timeFormatter, getMonthYear };
