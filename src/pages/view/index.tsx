import "./style/index.less";
import "../../components/Markdown/style/index.less";
import { useEffect, useRef, useState } from "react";
import Thumbnail, { ThumbnailHandler } from "../../components/Thumbnail";
import Directory, { DirectoryHandler } from "../../components/Directory";
import { useParams } from "react-router-dom";
import api from "../../api";
import { CatalogueNode } from "../../utils";
import ViewHeader from "../../components/pagesComponent/ViewHeader";
async function getInfoViewById(id: string) {
  const { data: res } = await api.info.infoViewById(id);
  if (res.code === 200) {
    return res.data;
  }
  return undefined;
}
export default function View() {
  const box = useRef<HTMLDivElement>(null);
  const [directoryList, setDirectoryList] = useState<CatalogueNode[]>();
  const router = useParams<{ id: string }>();
  const thumbnail = useRef<ThumbnailHandler>(null);
  const directory = useRef<DirectoryHandler>(null);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    getInfoViewById(router?.id || "")
      .then((item) => {
        if (!item) return;
        if (!box.current) return;
        console.log(item.contentHTML);
        console.log(item);
        box.current.innerHTML = item.contentHTML || "";
        setDirectoryList(JSON.parse(item.directory));
      })
      .then(() => {
        if (!thumbnail.current) return;
        thumbnail.current.update();
      })
      .then(() => {});
  }, []);
  useEffect(() => {
    // 更新线条
    directory.current?.init();
  }, [directoryList]);
  return (
    <>
      <ViewHeader />
      <div className="view">
        <div className="view">
          <div className="box-content">
            <div className="left">
              <Directory ref={directory} percent={percent} node={directoryList} />
            </div>

            <div className="markdown">
              <div className="preview" ref={box}></div>
            </div>
          </div>
          <Thumbnail dom={box} ref={thumbnail} percent={percent} onPercentChange={(e) => setPercent(e)} />
          <div className="bottom"></div>
        </div>
      </div>
    </>
  );
}
