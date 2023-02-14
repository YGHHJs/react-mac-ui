import "./index.less";
import React from "react";
import dock from "@/router/dock";
import { CreateWindow } from "@/layouts/desktop/components/Window";

export default function Dock() {
  return (
    <div className="dock-cont">
      <div className="dock">
        {dock.map((dockItem) => (
          <div className="dock-item" key={dockItem.path} onClick={() => CreateWindow(dockItem)}>
            <svg className="ali-icon" style={{ fill: dockItem.handle?.iconColor }} aria-hidden="true">
              <use xlinkHref={`#${dockItem.handle.icon}`} />
            </svg>
            <div className="dock-title">{dockItem.handle.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
