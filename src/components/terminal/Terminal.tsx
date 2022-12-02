import { FormEventHandler, useCallback, useRef } from "react";
import "./style/index.less";
import useCommand from "./use/useCommand";
import { context } from "./utils/strategyModel";
let commandList: string[] = [];
export default function Terminal() {
  // const [command, setCommand] = useCommand();
  const terminalBoxContent = useRef<HTMLDivElement>(null);
  const handleChange = useCallback<FormEventHandler<HTMLDivElement>>(
    (event) => {
      const nativeEvent = event.nativeEvent as InputEvent;
      const key = nativeEvent.data || "";
      const isChina = new RegExp("^[\\u4E00-\\u9fa5]+$").test(key);
      console.log(nativeEvent.inputType, nativeEvent.data);
      if (!terminalBoxContent.current) return;
      const text = terminalBoxContent.current.lastChild?.textContent || "";
      if (nativeEvent.inputType === "deleteContentBackward") {
        if (text === ":" && text.length === 1) {
          if (!terminalBoxContent.current.lastChild) return;
          terminalBoxContent.current.lastChild.textContent = ":>";
        }
        if (text === "" && text.length === 0) {
          if (!terminalBoxContent.current.lastChild) return;
          terminalBoxContent.current.lastChild.textContent = ":>";
        }
        commandList.pop();

        const box = terminalBoxContent.current;
        box.scrollTo(0, box.scrollHeight || 0);
        const range = window.getSelection();
        // if (!terminalBoxContent.current) return;
        range?.selectAllChildren(box);
        range?.collapseToEnd();
        return;
      }
      if (
        nativeEvent.inputType === "insertText" ||
        nativeEvent.inputType === "insertParagraph" ||
        (nativeEvent.inputType === "insertCompositionText" && isChina)
      ) {
        if (![null, ""].includes(key)) {
          if (key) commandList.push(key);
          console.log("commandList", commandList);
          return;
        }
        console.log(commandList);
        const command = commandList.join("");
        commandList = [];
        if (!terminalBoxContent.current) return;
        if (!command) {
          if (!terminalBoxContent.current.lastChild) return;
          terminalBoxContent.current.lastChild.textContent = ":>";
          const range = window.getSelection();
          if (!terminalBoxContent.current) return;
          range?.selectAllChildren(terminalBoxContent.current);
          range?.collapseToEnd();
          return;
        }
        const text = terminalBoxContent.current.lastChild?.textContent || "";
        console.log("command", command);
        console.log(text, event);
        if (text === ":" && text.length === 1) {
          if (!terminalBoxContent.current.lastChild) return;
          terminalBoxContent.current.lastChild.textContent = ":>";
        }
        if (text === "" && text.length === 0) {
          if (!terminalBoxContent.current.lastChild) return;
          terminalBoxContent.current.lastChild.textContent = ":>";
        }
        const box = terminalBoxContent.current;
        context.handlerCtx(command, box).then(() => {
          setTimeout(() => {
            box.scrollTo(0, box.scrollHeight || 0);
            const range = window.getSelection();
            // if (!terminalBoxContent.current) return;
            range?.selectAllChildren(box);
            range?.collapseToEnd();
          }, 16);
        });
      }
    },
    [terminalBoxContent]
  );
  let showPro = 0;
  const handleKeyDown = useCallback<FormEventHandler<HTMLDivElement>>(
    (event) => {
      if (!terminalBoxContent.current) return;
      const navive = event.nativeEvent as KeyboardEvent;
      console.log(navive.key);
      const range = window.getSelection() as Selection;
      if (!range) return;
      //@ts-ignore
      const pNode: HTMLDivElement = range.extentNode.parentNode;
      if (navive.key === "ArrowUp" || navive.key === "ArrowDown") {
        event.stopPropagation();
        event.preventDefault();
        if (!showPro) {
          const box = document.createElement("div");
          box.style.position = "relative";
          box.classList.add("attr-list");
          box.innerHTML = "123123123312132312";
          box.onclick = () => {
            const range = window.getSelection() as Selection;
            if (!range) return;
            //@ts-ignore
            const node: HTMLDivElement = range.extentNode;
            box.parentElement?.replaceChild(box, node);
            pNode.querySelector(".attr-list")?.remove();
          };
          // node.append(box);
          terminalBoxContent.current.append(box);
          console.log(pNode);
        }
        showPro = 1;
        return;
      }
      showPro = 0;
      pNode.querySelector(".attr-list")?.remove();
    },
    [terminalBoxContent]
  );

  return (
    <>
      <div className="terminal-box">
        <div
          className="terminal-box-content"
          ref={terminalBoxContent}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
        >
          {":>"}
        </div>
      </div>
    </>
  );
}
