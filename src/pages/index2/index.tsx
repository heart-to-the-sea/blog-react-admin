import { useEffect, useState } from "react";
import api from "../../api";
import { infoDeleteById } from "../../api/blog/info";
import { TDoc } from "../../app.url";
import BlogNode from "../../components/BlogNode/BlogNode";
import Header from "../../components/pagesComponent/Header/Header";
import Terminal from "../../components/terminal/Terminal";
import TimeLine from "../../components/TimeLine/TimeLine";
import TimeLineNode from "../../components/TimeLine/TimeLineNode";
import { date14Format, FORMAT_TYPE } from "../../utils/date";

import "./style/index.less";
async function getInfoAll() {
  const { data: res } = await api.info.infoAll();
  if (res.code === 200) {
    return res.data.list;
  }
  return [];
}
export default function IndexPage() {
  let [loading, setLoading] = useState(0);
  const [data, setData] = useState<TDoc[]>([]);
  let time = 0;
  const handleDelete = (id: number) => () => {
    infoDeleteById(id).then((res) => {
      if (res.data.code === 200) {
        getInfoAll()
          .then((res) => {
            setData(res);
          })
          .then(() => {
            time = 0;
            setLoading(0);
          });
      }
    });
  };
  const handleOnScroll = () => {
    return (event: Event) => {
      if (time > 0) return;
      time = 1;
      setLoading(1);
      console.log(loading);
      const clientHeight = document.documentElement.clientHeight; //浏览器高度
      const scrollHeight = document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      let distance = 100; //距离视窗还用50的时候，开始触发；
      console.log(scrollTop + clientHeight >= scrollHeight - distance && !loading);
      if (scrollTop + clientHeight >= scrollHeight - distance) {
        getInfoAll()
          .then((res) => {
            setData(res);
          })
          .then(() => {
            time = 0;
            setLoading(0);
          });
      }
    };
  };
  useEffect(() => {
    getInfoAll().then((res) => {
      setData(res);
    });
  }, []);
  useEffect(() => {
    let time = 0;
    time = window.setTimeout(() => {
      window.addEventListener("scroll", handleOnScroll());
    });
    return () => {
      window.clearTimeout(time);
    };
  }, []);
  return (
    <div className="index">
      {/* <Header /> */}
      <Terminal />
      <div className="box">
        <div className="blog-list">
          <TimeLine>
            {data.map((item) => (
              <TimeLineNode showDate={1} key={Math.random()} date={date14Format(item.createDate, FORMAT_TYPE.YYYY)}>
                <BlogNode onlyTitle={0} blogObj={item} onDelete={handleDelete(item.id)} />
              </TimeLineNode>
            ))}
          </TimeLine>

          {loading ? (
            <div className="blog-node blog-loading">
              <div className="blog-loading-back">正在请求后台数据...</div>
              正在请求后台数据...
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
