export enum FORMAT_TYPE {
  YYYYMMDD = "yyyymmdd",
  YYYY = "yyyy",
  MM = "mm",
  DD = "dd",
  HH = "hh",
  mm = "mm",
  SS = "ss",
  "YYYY-MM-DD" = "yyyy-mm-dd",
}
export function date14Format(date: number, format: FORMAT_TYPE) {
  const dateStr = String(date);
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const hours = dateStr.slice(8, 10);
  const points = dateStr.slice(10, 12);
  const seconds = dateStr.slice(12, 14);

  switch (format) {
    case FORMAT_TYPE.YYYY:
      return year;
    case FORMAT_TYPE.MM:
      return month;
    case FORMAT_TYPE.DD:
      return day;
    case FORMAT_TYPE.HH:
      return hours;
    case FORMAT_TYPE.mm:
      return points;
    case FORMAT_TYPE.SS:
      return seconds;
    case FORMAT_TYPE["YYYY-MM-DD"]:
      return `${year}-${month}-${day}`;
    default:
      return;
  }
}
