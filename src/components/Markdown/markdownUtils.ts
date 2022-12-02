import monaco, { Range } from "monaco-editor";
export const handlePaste = (editor: monaco.editor.IStandaloneCodeEditor) => {
  return (event: globalThis.ClipboardEvent) => {
    const items = event.clipboardData?.items || [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile()!;
        if (!file) return;
        const read = new FileReader();
        read.readAsDataURL(file);
        read.onload = (res) => {
          const blob: string = res.target?.result as string;
          if (!blob) return;
          const img = document.createElement("img");
          img.style.width = "100%";
          img.style.height = "100%";
          img.src = blob;
          const selection = editor.getSelection()!;
          editor.executeEdits("", [
            {
              range: Range.lift(selection),
              text: `![](${blob})`,
            },
          ]);
        };
      }
    }
  };
};
