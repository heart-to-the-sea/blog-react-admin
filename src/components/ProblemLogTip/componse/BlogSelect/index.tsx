import { FormEventHandler, useCallback, useState } from "react";
import "./style/index.less";
export interface Options {
  name: string;
  value: any;
  data: any;
  hover?: 0 | 1;
  children?: Options[];
}
interface Props {
  list: any[];
  value: any;
  name: string;
  onChange: (data: Options) => void;
}
export default function BlogSelect(props: Props) {
  const [visible, setVisible] = useState(0);
  const [activePath, setActivePath] = useState<number[]>([]);
  const handleChange = (data: Options) => {
    console.log("change", data);
    props.onChange(data);
    setVisible(0);
  };
  const handleBlur = useCallback<FormEventHandler<HTMLDivElement>>(
    (event) => {
      setVisible(0);
    },
    [visible]
  );
  const onChangeActiveNode = (nodeIdx: number, idx: number) => {
    activePath[nodeIdx] = idx;
    setActivePath([...activePath]);
  };
  return (
    <>
      <div className="blog-select-box" onBlur={handleBlur}>
        <input
          className="blog-select"
          name=""
          id=""
          readOnly
          value={props.name || ""}
          onFocus={() => setVisible(1)}
        ></input>

        <div>
          <BlogSelectOptionsBox
            list={props.list}
            visible={visible}
            onChange={handleChange}
            activeValue={props.value}
            activePathArr={activePath}
            onChangeActiveNode={onChangeActiveNode}
          />
        </div>
      </div>
    </>
  );
}

interface PropsOption {
  list: Options[];
  activeValue: any;
  nodeIndex: number;
  onChange: (data: Options) => void;
  activePathArr: number[];
  onChangeActiveNode: (nodeIdx: number, idx: number) => void;
}
interface PropsOptionBox {
  list: Options[];
  visible: number;
  activeValue: any;
  onChange: (data: Options) => void;
  activePathArr: number[];
  onChangeActiveNode: (nodeIdx: number, idx: number) => void;
}
function BlogSelectOptionsBox(props: PropsOptionBox) {
  return (
    <div className={["select-option-box", props.visible ? "select-option-box-visible" : ""].join(" ")}>
      <BlogSelectOptions
        list={props.list}
        activePathArr={props.activePathArr}
        onChange={props.onChange}
        activeValue={props.activeValue}
        nodeIndex={0}
        onChangeActiveNode={props.onChangeActiveNode}
      />
    </div>
  );
}

function BlogSelectOptions(props: PropsOption) {
  const handleMouseEnter = (data: number) => {
    props.onChangeActiveNode(props.nodeIndex, data);
  };
  const children = props.list.map((item, index) => (
    <div
      className={[
        "select-option-node",
        props.activeValue === item.value ? "select-option-node-active" : "",
        props.activePathArr[props.nodeIndex] === index ? "select-option-node-path " : "",
      ].join(" ")}
      onMouseDown={() => {
        props.onChange(item);
      }}
      onMouseEnter={() => handleMouseEnter(index)}
      key={"options" + index}
    >
      {item.name}
    </div>
  ));
  return (
    <>
      <div className="select-option">{children}</div>
      {props.activePathArr[props.nodeIndex] !== -1 &&
      props.activePathArr[props.nodeIndex] !== undefined &&
      props.list[props.activePathArr[props.nodeIndex]].children ? (
        <BlogSelectOptions
          {...props}
          list={props.list[props.activePathArr[props.nodeIndex]].children || []}
          nodeIndex={props.nodeIndex + 1}
        />
      ) : (
        ""
      )}
    </>
  );
}
