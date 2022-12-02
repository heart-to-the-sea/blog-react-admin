import ReactDOM from "react-dom/client";
import Header from "../components/Header/Header";
import { HandleCommand } from "../handleCommand";

export default class HandleIndex implements HandleCommand {
  async handler(commandList: string[], content: HTMLDivElement) {
    content.innerHTML = "";
    const box = document.createElement("div");
    box.classList.add("terminal-index-box");

    content.append(box);
    const last = document.createElement("div");
    last.innerHTML = ":>";
    content.append(last);
    ReactDOM.createRoot(box).render(<Header />);
  }
}
