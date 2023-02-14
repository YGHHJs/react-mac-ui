import React, { useState, useRef, useEffect } from "react";

import { getTime } from "./utils/time";
import "./index.less";

import Dock from "./components/Dock";
import Calendar from "./components/Calendar";
import { CreateWindow } from "./components/Window";

import dockRouter from "@/router/dock";

export default function Desktop() {
  /**
   * 任务栏时间
   */
  const taskBarTime = () => {
    const { month, day, hour, minutes } = getTime();
    return `${month}-${day} ${hour}:${minutes}`;
  };

  const [time, setTime] = useState(taskBarTime());
  const [calendarShow, setCalendarShow] = useState(false);

  const closeCalendar = () => {
    setCalendarShow(false);
  };

  const timer = useRef<Interval | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(taskBarTime());
    });
    return () => {
      clearInterval(timer.current as Interval);
    };
  });
  return (
    <div className="desktop">
      <div className="taskbar flex-between">
        <div className="mac">
          <i className="iconfont icon-mac" />
        </div>
        <div className="taskbar-right flex-between">
          <i className="iconfont icon-trumpet" />
          <div onClick={() => setCalendarShow(true)}>{time}</div>
          <i className="iconfont icon-message" />
        </div>
      </div>
      {calendarShow ? <Calendar hiddenCalendar={closeCalendar} /> : ""}
      <Dock />
    </div>
  );
}
