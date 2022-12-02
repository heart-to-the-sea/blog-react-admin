import { ReactNode } from "react";
import "./style/index.less";
interface Props {
  showDate?: 0 | 1;
  children: ReactNode[];
}
export default function TimeLine(props: Props) {
  return (
    <>
      <div className="blot-time-line-list">
        {props.children}
      </div>
    </>
  );
}
