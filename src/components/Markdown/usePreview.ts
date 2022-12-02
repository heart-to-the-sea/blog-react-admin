import { useEffect, useState } from "react";
import { Catalogue } from "../../utils";
import useMarkContainer from "./markdown-plugins/markdownContainer";
import "./style/index.less";
import markdownIt from "markdown-it";
import hljs from "highlight.js";
//@ts-ignore
import pseudocode from "pseudocode";
import uslug from "uslug";
import katex from "katex";

export default function usePreview(data: string) {
  //@ts-ignore
  window.k=katex
  const [preview, setPreview] = useState("");
  const [directory, setDirectory] = useState("");
  const mDown = markdownIt({
    xhtmlOut: true, // br
    breaks: false,
    linkify: true,
    html: true,
    highlight: function (str, lang) {
      // 当前时间加随机数生成唯一的id标识
      const codeIndex = Math.floor(Math.random() * 10000000);
      // 复制功能主要使用的是 clipboard.js
      const copy = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</button>`;
      let html = ``;
      const linesLength = str.split(/\n/).length - 1;
      // 生成行号
      let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
      for (let index = 0; index < linesLength; index++) {
        linesNum = linesNum + "<span></span>";
      }
      linesNum += "</span>";
      if (lang && hljs.getLanguage(lang)) {
        try {
          // highlight.js 高亮代码
          const preCode = hljs.highlight(lang, str, true).value;
          html = html + preCode;
          if (linesLength) {
            html += '<b class="name">' + lang + "</b>";
          }
          // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "&lt;" 代替，不影响复制功能
          return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
            /<\/textarea>/g,
            "&lt;/textarea>"
          )}</textarea>`;
        } catch (error) {
          console.log(error);
        }
      } else if ("mermaid" === lang) {
        return `<pre class="mermaid">${str}</pre>`;
      }
      else if ("pseudocode" === lang) {
        try {
          // 生成伪代码公式
          const box = document.createElement("div");
          const det = pseudocode.render(str,box,{
            lineNumber: false,
            indentSize: '1.5em',
            commentDelimiter: '//',
            lineNumberPunc: ':',
            noEnd: false,
            captionCount: undefined
          });
          det.classList.add("ps-root");
          console.log(det);
          // box.appendChild(det);
          // 去除换行
          return box.innerHTML.replaceAll("\n", "");
          // 方式2
          // const box = document.createElement("div");
          // const det = katex.renderToString(str,{throwOnError:false})
          // // box.appendChild(det);
          // return box.innerHTML.replaceAll("\n", "");
        } catch {
          return `<pre>${str}</pre>`;
        }
      }

      const preCode = mDown.utils.escapeHtml(str);
      html = html + preCode;
      return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
        /<\/textarea>/g,
        "&lt;/textarea>"
      )}</textarea>`;
    },
  });
  useMarkContainer(mDown);
  mDown.use(require("markdown-it-task-lists"));
  mDown.use(require("markdown-it-katex"), {
    engine: require("katex"),
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  });
  // 生成 目录索引
  mDown.use(require("markdown-it-anchor").default, {
    permalink: true,
    permalinkSymbol: "#",
    slugify: (s: string) => "title-" + uslug(s),
  });
  mDown.use(require("markdown-it-toc-done-right").default, {
    slugify: (s: string, ...args: any) => "title-" + uslug(s),
    containerClass: "toc", //生成的容器的类名，这样最后返回来的字符串是 <nav class="toc"><nav/>
    containerId: "toc", //生成的容器的ID，这样最后返回来的字符串是 <nav id="toc"><nav/>
    listType: "ul", //导航列表使用ul还是ol
    listClass: "cataloglistClass", //li标签的样式名
    linkClass: "cataloglinkClass", //a标签的样式名
    callback: function (html: string, ast: any) {
      setDirectory(JSON.stringify(Catalogue.htmlToJson(html)));
    },
  });
  mDown.use(require("markdown-it-texmath"), { engine: require("katex"), delimiters: "dollars" });

  useEffect(() => {
    setPreview(mDown.render(data, {}));
  }, [data]);
  return {
    preview,
    directory,
  };
}
