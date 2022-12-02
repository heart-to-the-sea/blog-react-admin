import { RefObject, useEffect, useState } from "react";

export default function useHandleBarMouse(dom: RefObject<HTMLDivElement>, img: RefObject<HTMLImageElement>) {
  const [height, setHeight] = useState<string>("");
  const [move, setMove] = useState<number>(0);
  let offsetY = 0,
    pageY = 0;
  const mousedomove = (event: MouseEvent) => {
    let py = event.clientY - 100;
    console.log(event.pageY - pageY);
    if (py < 0) {
      py = 0;
    }
    if (py + 150 > window.innerHeight) {
      py = window.innerHeight - 150;
    }
    if (!dom.current) return;
    const top = window.getComputedStyle(dom.current).top.replace("px", "");
    console.log(top, py);
    dom.current.style.top = py + "px";

    let scrollY = (py /( window.innerHeight- 75)) * document.body.scrollHeight;
    window.scrollTo(0, scrollY);
  };
  const mousedown = (event: MouseEvent) => {
    setMove(1)
    console.log("mousd");
    offsetY = event.offsetY;
    pageY = event.clientY;
    window.addEventListener("mousemove", mousedomove);
  };

  const mousedoup = (event: MouseEvent) => {
    setMove(0)
    console.log("up");
    window.removeEventListener("mousemove", mousedomove);
  };
  useEffect(() => {
    if (!dom.current) return;
    dom.current.onmousedown = mousedown;
    window.addEventListener("mouseup", mousedoup);
    return () => {
      window.removeEventListener("mouseup", mousedoup);
      window.removeEventListener("mousemove", mousedomove);
    };
  }, [dom]);
  return { move };
}
