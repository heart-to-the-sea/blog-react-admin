import { ReactNode } from "react";
import "./style/index.less"
interface Props {
  left?: ReactNode;
  right?: ReactNode;
}
export default function BlogLabel(props: Props) {
  return (
    <>
      <div className="blog-label">
        <div className="label-left">{props.left}</div>
        <div className="label-right">{props.right}</div>
      </div>
    </>
  );
}
