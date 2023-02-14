import "./index.less";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getTime } from "../../utils/time";
import { DateHelper } from "./helper";

export default function Calendar({ hiddenCalendar = () => {} }) {
  const now = () => {
    const { month, day, hour, minutes, seconds } = getTime();
    return `${month}月${day}日 ${hour}:${minutes}:${seconds}`;
  };

  /**
   * 日历计时
   */
  const [time, setTime] = useState(now());

  /**
   * 日历活跃时间
   */
  const [activeTime] = useState(new Date());

  /**
   * 日历计时定时器
   */
  const timer = useRef<Interval | null>(null);

  /**
   * 日历辅助
   */
  const [dateHelper, setDateHelper] = useState(() => DateHelper(activeTime));

  /**
   * 计算今天
   */
  const isToday = useState<boolean | undefined>(
    (() => {
      const nowTime = getTime();
      const active = DateHelper(activeTime);
      if (nowTime.year === active.year && nowTime.month === active.month && nowTime.day === active.date) return true;
    })(),
  );

  useEffect(() => {
    setDateHelper(() => DateHelper(activeTime));
    timer.current = setInterval(() => {
      setTime(now());
    }, 1000);
    return () => {
      clearInterval(timer.current as Interval);
    };
  }, [activeTime]);

  return (
    <div
      className="calendar-shade"
      onClick={(e) => {
        const { target, currentTarget } = e;
        if (target === currentTarget) hiddenCalendar();
      }}
    >
      <div className="calendar">
        <div className="now">{time}</div>
        <div className="calendar-info flex-between">
          <div>
            {getTime(activeTime).year}年{getTime(activeTime).month}月
          </div>
          <div>
            <i className="iconfont icon-left" title="上个月" />
            <i className="iconfont icon-right" title="下个月" />
          </div>
        </div>
        <div className="calendar-main">
          <div className="calendar-week">
            {["日", "一", "二", "三", "四", "五", "六"].map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <div className="day-cont">
            {dateHelper.calendarPrevArr.map((item) => (
              <div className="prev-day" key={item}>
                {item}
              </div>
            ))}
            {Array.from({ length: dateHelper.days }, (_, i) => i + 1).map((item) => (
              <div
                className={["currentMonth-day", isToday && Number(item) === Number(getTime().day) ? "today" : ""].join(
                  " ",
                )}
                key={item}
              >
                {item}
              </div>
            ))}
            {Array.from({ length: dateHelper.calendarAfter }, (_, i) => i + 1).map((item) => (
              <div className="prev-day" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  hiddenCalendar: PropTypes.func.isRequired,
};
