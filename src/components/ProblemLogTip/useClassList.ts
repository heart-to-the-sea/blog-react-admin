import { useEffect, useState } from "react";
import api from "../../api";
import { TClass } from "../../app.url";
import { Options } from "./componse/BlogSelect";
async function classInfoList() {
  const { data: res } = await api.clazz.classInfoList();
  if (res.code === 200) {
    return res.data.list;
  }
  return [];
}

export function useClassList() {
  const [classList, setClassList] = useState<Options[]>([]);
  useEffect(() => {
    classInfoList().then((res) => {
      const list = res.map<Options>((item) => {
        return { name: item.name, value: item.id, data: item };
      });
      setClassList(list);
    });
  }, []);
  return {
    classList,
  };
}
