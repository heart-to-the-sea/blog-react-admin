import "./style/index.less";
import markdownIt from "markdown-it";
import hljs from "highlight.js";
import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import MonacoEditor, { MonacoEditorHandler } from "./MonacoEditor";
import mermaid from "mermaid";
interface PropsI {
  value: string;
  valueHTML: string;
  onChange: (data: string) => void;
  onHTMLChange: (data: string) => void;
}
export interface MarkdownHandler {
  init: (val: string) => void;
}
const Markdown: ForwardRefRenderFunction<MarkdownHandler, PropsI> = (props: PropsI, ref: any) => {
  const preview = useRef<HTMLDivElement>(null);
  const monacoEditor = useRef<MonacoEditorHandler>(null);
  const handleChange = (val: string) => {
    props.onChange(val);
  };
  const handleScroll = (val: number) => {
    preview.current?.scrollTo(0, preview.current.scrollHeight * val);
  };
  const init = (val: string) => {
    monacoEditor.current?.init(val);
  };
  useImperativeHandle(ref, () => ({
    init,
  }));
  useEffect(() => {
    if (!preview.current) return;
    preview.current.innerHTML = props.valueHTML;
    mermaid.init();
    setTimeout(() => {
      props?.onHTMLChange(preview.current?.innerHTML || "");
    });
  }, [props.valueHTML]);

  return (
    <>
      <div className="markdown">
        <MonacoEditor
          ref={monacoEditor}
          data={props.value}
          onScroll={handleScroll}
          onChange={(val: string) => {
            handleChange(val);
          }}
        />
        <div className="preview" ref={preview}></div>
      </div>
    </>
  );
};

export default forwardRef(Markdown);
