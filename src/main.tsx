/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
// 公共样式
import "@/assets/css/framework.less";
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
