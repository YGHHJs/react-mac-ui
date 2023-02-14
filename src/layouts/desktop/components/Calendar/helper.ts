export const DateHelper = (data = new Date()) => {
  const year = data.getFullYear();
  const month = data.getMonth();
  const date = data.getDate();
  const week = data.getDay();

  const days = (() => {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  })();

  const calendarAfter: number = (() => {
    const lastDay = new Date(data);
    lastDay.setMonth(month);
    lastDay.setDate(days);
    return 6 - lastDay.getDay();
  })();

  const calendarPrevArr: number[] = (() => {
    const firstDay = new Date(data);
    firstDay.setMonth(month);
    firstDay.setDate(1);
    const calendarPrev = firstDay.getDay();
    const temp: number[] = [];
    for (let i = 0; i < calendarPrev; i++) {
      firstDay.setDate(firstDay.getDate() - 1);
      temp.unshift(firstDay.getDate());
    }
    return temp;
  })();

  return {
    year,
    month,
    date,
    week,
    days,
    calendarAfter,
    calendarPrevArr,
  };
};

export const weeks: string[] = ["日", "一", "二", "三", "四", "五", "六"];
