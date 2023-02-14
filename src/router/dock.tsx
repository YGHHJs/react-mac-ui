import { RouteObject } from "react-router-dom";
import Vue from "@/pages/vue";

type LinkRoute = {
  path: string;
  handle: any;
};

export default [
  {
    path: "/launchpad",
    element: <Vue />,
    handle: {
      type: "app",
      title: "启动台",
      icon: "icon-launchpad",
      iconColor: "pink",
    },
  },
  {
    path: "/todo",
    element: <Vue />,
    handle: {
      type: "md",
      title: "待办事项",
      icon: "icon-todo",
    },
  },
  {
    path: "/vue",
    element: <Vue />,
    handle: {
      type: "md",
      title: "vue笔记",
      icon: "icon-vue",
    },
  },
  {
    path: "https://blog.csdn.net/m0_43599959",
    handle: {
      type: "link",
      title: "博客",
      icon: "icon-gitee",
    },
  },
  {
    path: "https://y.qq.com",
    handle: {
      type: "link",
      title: "QQ音乐",
      icon: "icon-qq-music",
    },
  },
] as (RouteObject | LinkRoute)[];
