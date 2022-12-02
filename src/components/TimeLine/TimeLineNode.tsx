import { ReactNode } from "react";

interface Props {
  showDate?: 0 | 1;
  date?: string;
  children: ReactNode;
}
export default function TimeLineNode(props: Props) {
  return (
    <>
      <div className="blog-time-line-node">
        <div className="blog-time-line">
          <div className="blog-time-line-item" style={{ display: !props.showDate ? "none" : "" }}>
            {props.date}
          </div>
        </div>
        <div className="blog-time-line-content">{props.children}</div>
      </div>
    </>
  );
}
