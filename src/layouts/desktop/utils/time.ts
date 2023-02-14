const addZero = (num: number): string | number => (num < 10 ? `0${num}` : num);

export type FormatTime = {
  year: number;
  month: string | number;
  day: string | number;
  hour: string | number;
  minutes: string | number;
  seconds: string | number;
};

/**
 * 获取当前时间
 */
export const getTime = (date = new Date()): FormatTime => {
  const now = new Date();
  const year = now.getFullYear();
  const month = addZero(now.getMonth() + 1);
  const day = addZero(now.getDate());
  const hour = addZero(now.getHours());
  const minutes = addZero(now.getMinutes());
  const seconds = addZero(now.getSeconds());
  return { year, month, day, hour, minutes, seconds };
};
