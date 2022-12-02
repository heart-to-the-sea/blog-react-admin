import COMMAND from "../../../use/command";
import { HandleCommand } from "../handleCommand";

export default class HandleError implements HandleCommand {
  async handler(commandList: string[], content: HTMLDivElement) {
    if (content.lastChild) (content.lastChild as HTMLElement).innerHTML = ":>请输入正确的命令或通过help命令查询";
    const div = document.createElement("div");
    // div.classList.add('')
    div.innerHTML = ":>";
    content.appendChild(div);
  }
}
