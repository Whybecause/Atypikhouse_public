import dayjs from "dayjs";
import "dayjs/locale/fr";
import { differenceInDays } from "date-fns";

export const sortByDate = (array) => {
  array.sort(function (a, b) {
    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
  });
};
export const sortByNewestDate = (array) => {
  array.sort(function (a, b) {
    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
  });
};
export const sortByNewestDateStart = (array) => {
  array.sort(function (a, b) {
    return Number(new Date(b.dateStart)) - Number(new Date(a.dateStart));
  });
};

export const showDateOrTime = (date) => {
  if (dayjs(new Date()).format("DD MM YY") > dayjs(date).format("DD MM YY")) {
    return dayjs(date).format("DD/MM/YY");
  } else {
    return dayjs(date).format("HH:mm");
  }
};

export const isPropertyNew = (dateStart) => {
  const today = new Date();
  const diffInDays = differenceInDays(today, new Date(dateStart));
  if (diffInDays < 30) return true;
  else return false;
};

export const dateLang = (date, format) => {
  return dayjs(date).locale("fr").format(format);
};

export const getRangeOfDates = (startAt, endAt) => {
  const tempDates = [];
  const momentEndAt = dayjs(endAt);
  let momentStartAt = dayjs(startAt);

  while (momentStartAt < momentEndAt) {
    tempDates.push(momentStartAt);
    momentStartAt = momentStartAt.add(1, "day");
  }

  tempDates.push(momentEndAt);

  return tempDates;
};

export const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, endDate];

  return dates;
};

export const formatDateForSearch = (date) => !date ? null : dayjs(date).format('YYYY-MM-DD')

