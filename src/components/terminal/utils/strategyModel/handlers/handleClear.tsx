import COMMAND from "../../../use/command";
import { HandleCommand } from "../handleCommand";

export default class HandleClear implements HandleCommand {
  async handler(commandList: string[], content: HTMLDivElement) {
    content.innerHTML = ":>";
  }
}
