import api from "../../../../../api";
import { InfoAllParams } from "../../../../../app.url";
import { HandleCommand } from "../handleCommand";

async function getInfoAll(params: Partial<InfoAllParams>) {
  const { data: res } = await api.info.infoAll(params);
  if (res.code === 200) {
    return res.data.list;
  }
  return [];
}
export default class HandlerLS implements HandleCommand {
  async handler(commandList: string[], content: HTMLDivElement) {
    const keyword = this.getKeyWord(commandList);
    const box = document.createElement("div");
    box.classList.add("terminal-list");
    console.log("--->", commandList);
    console.log(this.getSearch(commandList));
    return getInfoAll(this.getSearch(commandList)).then((item) => {
      item
        .map((item) => ({ div: document.createElement("div"), data: item }))
        .filter((item) => item.data.title.includes(keyword) || keyword === "")
        .map((item, index) => {
          item.div.innerHTML = `
          <div class="terminal-list-title">
            <p class="left-index">{ ${index} }</p>
            ${item.data.title.replaceAll(keyword, `<span class="terminal-list-title-mark">${keyword}</span>`)}
          </div>
          `;
          item.div.onclick = () => window.open("/view/" + item.data.id);
          item.div.className = "terminal-list-node";
          item.div.contentEditable = "false";
          return item.div;
        })
        .map((item) => {
          box.append(item);
        });
      content?.append(box);
      const last = document.createElement("div");
      last.innerHTML = ":>";
      content.append(last);
    });
  }
  getKeyWord(commandList: string[]): string {
    const index = commandList.findIndex((item) => item === "|");
    if (commandList.length - 1 <= index || -1 === index) return "";

    return commandList[index + 1];
  }
  getSearch(commandList: string[]): Partial<InfoAllParams> {
    return commandList
      .filter((item) => item.includes("="))
      .map((item) => item.split("="))
      .reduce((obj, item) => {
        obj[item[0] as keyof InfoAllParams] = item[1];
        return obj;
      }, {} as Partial<InfoAllParams>);
  }
}
