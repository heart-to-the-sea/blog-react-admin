import {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEvent,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./style/index.less";
import html2canvas from "html2canvas";
import useHandleBarMouse from "./handleBarMouse";
interface Props {
  dom: RefObject<HTMLDivElement>;
  percent: number;
  onPercentChange: (percent: number) => void;
}
export interface ThumbnailHandler {
  update: () => void;
}
const Thumbnail: ForwardRefRenderFunction<ThumbnailHandler, Props> = (props: Props, ref: any) => {
  const bar = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const { move } = useHandleBarMouse(bar, img);
  const handleScroll = () => {
    console.dir(document.body);
    const top = document.documentElement.scrollTop;
    const allHeight = document.body.scrollHeight;
    const winHeight = window.innerHeight;
    const height = img.current?.offsetHeight || 0;
    // 滚动条 相对于总长度的百分比
    const percent = top / (allHeight - winHeight);
    props.onPercentChange(percent);
    if (!bar.current) return;
    if (!img.current) return;
    if (!move) {
      bar.current.style.top = percent * (winHeight - 150) + "px";
    }
    if (height - winHeight < 0) return;
    img.current.style.top = percent * -(height - winHeight) + "px";
  };
  const update = () => {
    console.log(update);
    if (!props.dom.current) return;
    html2canvas(props.dom.current, {
      scale: 0.4,
      useCORS: true, // 允许加载跨域的图片
      allowTaint: false,
      //@ts-ignore
      tainttest: true, // 检测每张图片都已经加载完成
      logging: true,
      backgroundColor: null,
    }).then((canvas) => {
      if (!img.current) return;
      const box = document.querySelector<HTMLDivElement>(".thumbnail");
      const image = canvas.toDataURL("image/png");
      console.log(image.length);
      img.current.src = image;
    });
  };
  useImperativeHandle(ref, () => ({
    update,
  }));
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    update();
  }, [props.dom]);
  return (
    <>
      <div className="thumbnail">
        <div className="bar" ref={bar}></div>
        <img ref={img} className="img" />
      </div>
    </>
  );
};

export default forwardRef(Thumbnail);
