import { useEffect, useState } from "react";
import IconMap from "./IconsMap";
interface Props {
  name: string;
  size?: string;
  style?: Object;
}
export default function Icon(props: Props) {
  const [style, setStyle] = useState<Object>({});
  useEffect(() => {
    setStyle({
      ...(props.style || {}),
    });
  }, [props]);
  return (
    <svg className="icon" aria-hidden="true" style={style} width={props.size || 16} height={props.size || 16}>
      <use xlinkHref={props.name as string}></use>
    </svg>
  );
}
