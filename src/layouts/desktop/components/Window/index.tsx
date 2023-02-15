import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

import windowStore from "../../store/window";
import { closeWindowSetGray, selectParentNodeByClass, setGrayMode } from "./helper";
import { WindowProps } from "./typing";

import "./index.less";

const Window: React.FC<WindowProps> = ({ menus }) => {
  const path = useRef<string>("");
  if (menus.handle.type === "md") {
    path.current = `#${menus.path}`;
  } else {
    path.current = menus.path as string;
  }
  const [isMax, setIsMax] = useState<boolean>(false);
  const [isMin, setIsMin] = useState<boolean>(false);
  const [isShade, setIsShade] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(false);

  const closeWait = useRef<Timeout | null>(null);

  const bounds = useRef<{
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
  }>({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const inset = useRef<{
    left: string;
    top: string;
    bottom: string;
    right: string;
  }>({
    top: "calc(10vh - 0px)",
    right: "calc(10vw - 0px)",
    bottom: "calc(10vh - 0px)",
    left: "calc(10vw - 0px)",
  });

  const windowResize = (e: React.MouseEvent<HTMLElement>, direction: string) => {
    setIsShade(true);
    const window = selectParentNodeByClass(e.target as HTMLElement, "window");
    const { style, offsetWidth, offsetHeight } = window;
    window.classList.add("window-no-transition");
    const instList: string[] = [style.top, style.right, style.bottom, style.left];
    const moveStarX = e.clientX;
    const moveStarY = e.clientY;
    document.onmousemove = (ev) => {
      console.log(window.offsetWidth);
      const h = ev.clientY - moveStarY;
      const x = ev.clientX - moveStarX;
      switch (direction) {
        case "top":
          window.style.top = `calc(10vh - ${parseInt(instList[0].split(" ").at(-1) as string, 10) - h}px)`;
          break;
        case "right":
          window.style.right = `calc(10vw - ${parseInt(instList[1].split(" ").at(-1) as string, 10) + x}px)`;
          break;
        case "bottom":
          window.style.bottom = `calc(10vw - ${parseInt(instList[2].split(" ").at(-1) as string, 10) + h}px)`;
          break;
        default:
          window.style.left = `calc(10vw - ${parseInt(instList[3].split(" ").at(-1) as string, 10) - x}px)`;
          break;
      }
    };
    document.onmouseup = () => {
      setIsShade(false);
      window.classList.remove("window-no-transition");
      document.onmousemove = null;
      (e.target as HTMLElement).onmousedown = null;
    };
  };

  const windowClose = async (e: React.MouseEvent<HTMLElement>) => {
    setIsMax(false);
    e.stopPropagation();
    setIsClose(true);
    closeWindowSetGray();
    closeWait.current = await setTimeout(() => {
      selectParentNodeByClass(e.target as HTMLDivElement, "window-container").remove();
    }, 1000);
  };

  /**
   * 窗口最小切换
   */
  const toggleMin = () => {
    setIsMax(false);
    closeWait.current = setTimeout(() => {
      setIsMax(true);
    }, 1000);
    return isMin ? setIsMin(false) : setIsMin(true);
  };

  useEffect(() => () => {
    clearTimeout(closeWait.current as Timeout);
    closeWait.current = null;
  });

  /**
   * 窗口最大化切换
   * @param event
   */
  const toggleMax = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { target, currentTarget } = event;
    return target === currentTarget ? (isMax ? setIsMax(false) : setIsMax(true)) : "";
  };

  const windowDrag = (e: DraggableEvent, data: DraggableData) => {
    // const { offsetWidth, offsetHeight } = (e.target as HTMLDivElement).parentNode as HTMLDivElement;
  };

  /**
   * 窗口拖拽边界检测计算&iframe shade
   * @param e
   */
  const windowDragStar = (e: DraggableEvent) => {
    const { target } = e;
    setGrayMode(target as HTMLDivElement);
    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = (target as HTMLDivElement)
      .parentNode as HTMLDivElement;
    bounds.current.left = -(offsetLeft + offsetWidth - 200);
    bounds.current.top = -(offsetTop - 30);
    bounds.current.bottom = offsetHeight - 50;
    bounds.current.right = offsetWidth + offsetLeft - 200;
    ((target as HTMLDivElement).parentNode as HTMLDivElement).style.zIndex = windowStore.getZIndex();
    windowStore.addZIndex();
    setIsShade(true);
  };

  const windowDragStop = () => {
    setIsShade(false);
  };

  return (
    <Draggable
      handle=".window-top"
      disabled={isMax}
      cancel=".iconfont"
      bounds={bounds.current}
      onStart={(e, data) => windowDragStar(e)}
      onDrag={(e, data) => windowDrag(e, data)}
      onStop={windowDragStop}
    >
      <div
        className={["window", isMax ? "window-max" : "", isMin ? "window-min" : "", isClose ? "window-close" : ""]
          .filter((s) => s)
          .join(" ")}
        style={{
          zIndex: windowStore.getZIndex(),
          inset: `${inset.current.top} ${inset.current.right} ${inset.current.bottom} ${inset.current.left}`,
        }}
      >
        <div onDoubleClick={(event) => toggleMax(event)} className="window-top flex-between">
          <div className="window-option">
            <i className="iconfont icon-close" title="关闭" onClick={(event) => windowClose(event)} />
            <i className="iconfont icon-min" title="最小化" onClick={(event) => toggleMin()} />
            <i className="iconfont icon-max" title="最大化" onClick={(event) => toggleMax(event)} />
          </div>
          <div className="window-history">
            <i className="iconfont icon-left" title="后退" />
            <i className="iconfont icon-right" title="前进" />
            {inset.current.top}
          </div>
          <div className="window-title">
            <i className="iconfont icon-trumpet" />
            <div className="window-title-main" />
          </div>
        </div>
        <div className="window-main">
          <iframe title="你好押" src={path.current} />
          {isShade ? <div className="iframe-shade" /> : ""}
        </div>
        <div className="win-resize-helper">
          <div className="line-top" onMouseDown={(event) => windowResize(event, "top")} />
          <div
            className="line-right"
            onMouseDown={(event) => {
              windowResize(event, "right");
            }}
          />
          <div
            className="line-bottom"
            onMouseDown={(event) => {
              windowResize(event, "bottom");
            }}
          />
          <div
            className="line-left"
            onMouseDown={(event) => {
              windowResize(event, "left");
            }}
          />
          <span className="dot-one" />
          <span className="dot-two" />
          <span className="dot-three" />
          <span className="dot-four" />
        </div>
      </div>
    </Draggable>
  );
};

// Window.propTypes = {
//   menus: PropTypes.shape({}).isRequired,
// };

export const CreateWindow = (menus: any) => {
  const windowList = document.querySelectorAll(".window");
  [...windowList].forEach((item) => {
    item.classList.add("gray");
  });
  const container = document.createElement("div");
  container.className = "window-container";
  container.setAttribute("windowId", new Date().valueOf().toString());
  createRoot(container).render(<Window menus={menus} />);
  document.getElementById("root")?.appendChild(container);
};
