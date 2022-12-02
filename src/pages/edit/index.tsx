import "vditor/dist/index.css";
import "./style/index.less";
import Markdown, { MarkdownHandler } from "../../components/Markdown/Markdown";
import api from "../../api";
import { useEffect, useRef, useState } from "react";
import usePreview from "../../components/Markdown/usePreview";
import { useParams } from "react-router-dom";
import { infoEdit } from "../../api/blog/info";
import { TDoc } from "../../app.url";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/storeHooks";
import { setDoc } from "../../store/doc";
async function getInfoViewById(id: string) {
  const { data: res } = await api.info.infoViewById(id);
  if (res.code === 200) {
    return res.data;
  }
  return undefined;
}
interface Props {}
export default function Edit(props: Props) {
  const doc = useAppSelector((state) => state.doc.doc);
  const dispatch = useAppDispatch();
  // 获取search参数
  // const params = useLocation().search;
  const pathValue = useParams<{ id: string }>();
  // 编辑后的记录
  const [data, setData] = useState<string>("");
  const [dataHTML, setDataHTML] = useState<string>("");
  // 表单数据缓存
  const [formData, setFormData] = useState<TDoc>();
  const markdown = useRef<MarkdownHandler>(null);
  // 返回渲染数据
  const { preview, directory } = usePreview(data);
  const handleChange = (val: string) => {
    setData(val);
  };
  const handleHTMLChange = (val: string) => {
    setDataHTML(val);
  };
  const handleSave = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        event.stopPropagation();
        console.log("ctl" + event.key, { formData, content: data, contentHTML: preview });
        infoEdit({
          ...formData,
          ...doc,
          content: data,
          contentHTML: dataHTML,
          directory: directory,
        }).then((res) => {
          setFormData({ ...res.data.data });
        });
      }
    }
    return false;
  };
  useEffect(() => {
    getInfoViewById(pathValue.id || "").then((item) => {
      setData(item?.content || "");
      markdown.current?.init(item?.content || "");
      if (item) {
        setFormData({
          ...item,
        });
        dispatch(setDoc({ ...item }));
      }
    });
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleSave);
    const time = window.setInterval(() => {
      infoEdit({
        ...formData,
        content: data,
        contentHTML: dataHTML,
        directory: directory,
      }).then((res) => {
        setFormData({ ...res.data.data });
      });
    }, 5000);
    return () => {
      window.removeEventListener("keydown", handleSave);
      window.clearInterval(time);
    };
  }, [data, preview, dataHTML, directory, formData]);
  return (
    <div className="edit">
      <Markdown
        ref={markdown}
        value={data}
        valueHTML={preview}
        onChange={handleChange}
        onHTMLChange={handleHTMLChange}
      />
    </div>
  );
}
