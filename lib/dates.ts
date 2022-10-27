const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

const days = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];

export const formatDate = (datetime: Date | null) => {
  if (!datetime) return "";
  const month = months[datetime.getUTCMonth()];
  const date = days[datetime.getUTCDate() - 1];
  const weekday = datetime.getUTCDay();
  const year = datetime.getUTCFullYear();
  const hour = datetime.getUTCHours();
  const minutes = datetime.getMinutes();

  if (year < 2022) return "";

  const time = minutes % 10 ? "" : `. ${hour}h${minutes} GMT`;
  const day = weekday > 5 ? "" : `${date}, `;

  return `${month} ` + day + `${year}` + time;
};
