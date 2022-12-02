import { useState } from "react";

interface SearchListI {
  html: string;
  dom: HTMLUnknownElement;
}

export default function useSearchList() {
  const [list, setList] = useState<SearchListI[]>([]);
  const clearList = () => {
    list.forEach(item=>item.dom.classList.remove('mark'))
    setList([]);
  };
  const searchList = () => {
    const dom = document.querySelectorAll<HTMLUnknownElement>(".mark");
    const set = new Set(Array.from(dom).map((item) => item.parentElement));
    const list: SearchListI[] = [];
    set.forEach((item) => {
      const html = item?.innerHTML;
      if (html) {
        list.push({
          html,
          dom: item,
        });
      }
    });
    console.log(list);
    setList([...list]);
  };
  const jumpToDom = (item: SearchListI) => () => {
    document.querySelectorAll<HTMLUnknownElement>(".jump-mark").forEach((item) => item.classList.remove("jump-mark"));
    item.dom.scrollIntoView({ behavior: "auto", block: "center" });
    item.dom.classList.add("jump-mark");
  };
  return { list, searchList, clearList, jumpToDom };
}
