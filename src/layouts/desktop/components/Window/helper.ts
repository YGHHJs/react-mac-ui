/**
 * 找到含有指定class的dom
 * @param target
 * @param className
 */
export const selectParentNodeByClass = (target: HTMLElement, className: string): HTMLElement => {
  if ((target.parentNode as HTMLElement)?.className?.includes(className)) {
    return target.parentNode as HTMLElement;
  }
  return selectParentNodeByClass(target.parentNode as HTMLElement, className);
};

/**
 * 给非激活窗口添加灰度模式
 * @param target
 */
export const setGrayMode = (target: HTMLDivElement) => {
  const windowContainers = document.getElementsByClassName("window");
  for (let i = 0; i < windowContainers.length; i++) {
    windowContainers[i].classList.add("gray");
  }
  selectParentNodeByClass(target, "window")?.classList.remove("gray");
};

/**
 * 关闭窗口时设置灰度模式
 */
export const closeWindowSetGray = () => {
  const windowList = document.querySelectorAll(".window");
  const maxZIndex = Math.max(...[...windowList].map((domItem) => Number((domItem as HTMLElement).style.zIndex)));
  [...windowList].forEach((item) => {
    console.log(item);
    if ((item as HTMLElement).style.zIndex === String(maxZIndex)) {
      (item as HTMLElement).classList.remove("gray");
    }
  });
};
