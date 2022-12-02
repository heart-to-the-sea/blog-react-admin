import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { setDoc } from "../../../../store/doc";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/storeHooks";
import { useClassList } from "../../useClassList";
import BlogLabel from "../BlogLabel";
import BlogSelect from "../BlogSelect";
import "./style/index.less";

export default function DOcSetting() {
  const doc = useAppSelector((state) => state.doc.doc);
  const dispatch = useAppDispatch();
  const [className, setClassName] = useState("");
  const [classValue, setClassValue] = useState<number>();
  const [initTitle, setInitTitle] = useState("");
  const [initAbs, setInitAbs] = useState("");
  const { classList } = useClassList();
  const handleTitleChange = (event: InputEvent) => {
    const box = event.target as HTMLDivElement;
    console.log(box.innerText);
    dispatch(setDoc({ ...doc, title: box.innerText }));
  };
  const handleAbsChange = (event: InputEvent) => {
    const box = event.target as HTMLDivElement;
    console.log(box.innerText);
    dispatch(setDoc({ ...doc, abstract: box.innerText }));
  };
  useEffect(() => {
    setInitAbs(doc.abstract || "");
    setInitTitle(doc.title || "");
    setClassName(doc.className || "");
    setClassValue(doc.classId);
  }, []);
  return (
    <>
      <div className="doc-setting-box">
        <BlogLabel
          left={<span style={{ lineHeight: "50px" }}>文章标题</span>}
          right={
            <h1
              className="doc-setting-box-title"
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) => handleTitleChange(e.nativeEvent as InputEvent)}
            >
              {initTitle}
            </h1>
          }
        />
        <BlogLabel
          left={<span style={{ lineHeight: "50px" }}>文章摘要</span>}
          right={
            <div
              className="doc-setting-box-abs"
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) => handleAbsChange(e.nativeEvent as InputEvent)}
            >
              {initAbs}
            </div>
          }
        />
        <BlogLabel
          left={<span style={{ lineHeight: "40px" }}>选择分类</span>}
          right={
            <BlogSelect
              value={classValue}
              name={className}
              list={classList}
              onChange={(data) => {
                setClassValue(data.value);
                setClassName(data.name);
              }}
            />
          }
        />
      </div>
    </>
  );
}
