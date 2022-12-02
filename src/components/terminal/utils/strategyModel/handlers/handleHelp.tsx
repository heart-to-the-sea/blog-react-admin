import ReactDOM from "react-dom/client";
import COMMAND from "../../../use/command";
import HelpList from "../components/Help/HelpList";
import { HandleCommand } from "../handleCommand";
const commandDocList = [
  {
    name: "help",
    doc: `介绍
    打印所有命令,供用户使用
格式
    help <命令> 返回请求的命令的详细解释
`,
  },
];
export default class HandleHelp implements HandleCommand {
  async handler(commandList: string[], content: HTMLDivElement) {
    if (commandList.length === 1) {
      const box = document.createElement("div");
      box.classList.add("terminal-index-box");

      content.append(box);
      const last = document.createElement("div");
      last.innerHTML = ":>";
      content.append(last);
      ReactDOM.createRoot(box).render(<HelpList list={commandDocList} />);
    }
  }
}
