import "./style/index.less";
import { jsPlumb, jsPlumbInstance } from "jsplumb";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CatalogueNode } from "../../utils";
const nodes: CatalogueNode[] = [];
interface ListProps {
  node: CatalogueNode[] | undefined;
  active: string;
  onActiveChange: (active: string, nodes: CatalogueNode) => void | undefined;
}
function List(props: ListProps) {
  if (!props.node) {
    return <></>;
  }
  const goMark = (mark: string, node: CatalogueNode) => () => {
    console.log(decodeURI(mark));

    document.querySelector(decodeURI(mark))?.scrollIntoView(true);
    window.scrollTo(0, window.scrollY - 100);
    props?.onActiveChange(decodeURI(mark), node);
  };
  return (
    <>
      <ul>
        {props.node.map((item) => {
          return (
            <li key={item.id}>
              <p
                id={"pli" + decodeURI(item.id).replace("#", "")}
                className={[props.active === decodeURI(item.id) ? "list-active" : ""].join(" ")}
                onClick={goMark(decodeURI(item.id), item)}
              >
                {item.name}
              </p>
              <List node={item.children} active={props.active} onActiveChange={props?.onActiveChange} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
interface Props {
  percent: number;
  node: CatalogueNode[] | undefined;
}
export interface DirectoryHandler {
  update: () => void;
  init: () => void;
}
function Directory(props: Props, ref: any) {
  const [active, setActive] = useState<string>("");
  const [jsplumb, setJsPlumb] = useState<jsPlumbInstance>();
  //@ts-ignore
  window.jsPlumb = jsPlumb;
  useImperativeHandle(ref, () => ({
    update,
    init,
  }));
  const init = () => {
    const jsp = jsPlumb.getInstance({
      PaintStyle: {
        stroke: "#00c4c408",
        strokeWidth: 1,
      },
    });
    // if (document.querySelector(".jsplumb-line")) jsp.setContainer(document.querySelector(".jsplumb-line") as Element);
    jsp.ready(() => {
      if (props.node)
        props.node
          .flatMap((item) => [item, ...(item.children || [])])
          .flatMap((item) => [item, ...(item.children || [])])
          .flatMap((item) => [item, ...(item.children || [])])
          .flatMap((item) => [item, ...(item.children || [])])
          .flatMap((item) => [item, ...(item.children || [])])
          .flatMap((item) => [item, ...(item.children || [])])
          .flatMap((item) => [item, ...(item.children || [])])
          ?.forEach((item) => {
            console.log(item);
            if (!item) {
              return;
            }
            console.log({
              source: decodeURI(item.id.replace("#", "")),
              target: "pli" + decodeURI(item.id.replace("#", "")),
            });
            //@ts-ignore
            window.jsp = jsp;
            jsp.connect(
              {
                source: decodeURI(item.id.replace("#", "")),
                target: "pli" + decodeURI(item.id.replace("#", "")),
                detachable: false,
              },
              {
                endpoint: "Blank",
                connector: ["Flowchart"],
                anchor: ["Left", "Right"],
              }
            );
          });
      window.onscroll = () => {
        jsp.repaintEverything();
      };
    });
    setJsPlumb(jsp);
  };
  const update = () => {
    jsplumb?.repaintEverything();
    return false;
  };
  const handleActiveChange = (active: string, nodes: CatalogueNode) => {
    jsplumb
      ?.getAllConnections()
      //@ts-ignore
      .forEach((item) => item?.setPaintStyle({ stroke: "#00c4c408", strokeWidth: 1 }));
    //@ts-ignore
    const conn = jsplumb?.getConnections({
      source: decodeURI(nodes.id.replace("#", "")),
      target: "pli" + decodeURI(nodes.id.replace("#", "")),
    });
    conn?.forEach((conn: any) => conn?.setPaintStyle({ stroke: "#f00", strokeWidth: 3 }));
    setActive(active);
  };
  useEffect(() => {
    console.log(props.percent);
    const boxHeight = (document.querySelector(".directory") as HTMLDivElement).offsetHeight;
    const ul = document.querySelector(".directory") as HTMLUListElement;
    console.log(-boxHeight * props.percent);
    ul.scrollTo(0, boxHeight * props.percent);
  }, [props.percent]);
  useEffect(() => {}, []);
  return (
    <div className="directory" onScroll={update}>
      <List node={props.node || []} active={active} onActiveChange={handleActiveChange} />
    </div>
  );
}

export default forwardRef(Directory);
