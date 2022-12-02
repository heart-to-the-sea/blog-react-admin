import COMMAND from "../../../use/command";
import { HandleCommand } from "../handleCommand";

export default class HandleCreate implements HandleCommand {
  async handler(commandList: string[], content: HTMLDivElement) {
    const div = document.createElement("div");
    div.innerHTML = ":>";
    content.appendChild(div);
    window.open("/edit")
  }
}
