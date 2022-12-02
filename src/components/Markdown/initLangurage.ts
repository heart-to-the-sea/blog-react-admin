import { languages } from "monaco-editor";
import { mermaids, pseudocode, titles } from "./myLanguageTips";
export default function initLangurage() {
  languages.registerCompletionItemProvider("markdown", {
    provideCompletionItems(model, position, context, token) {
      const word = model.getWordUntilPosition(position);
      const suggestions = titles.map((item) => ({
        ...item,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        },
      }));
      return {
        suggestions:[...suggestions],
      };
    },
    triggerCharacters: ["#",""],
  });
  languages.registerCompletionItemProvider("markdown", {
    provideCompletionItems(model, position, context, token) {
      const word = model.getWordUntilPosition(position);
      const suggestions = mermaids.map((item) => ({
        ...item,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        },
      }));
      return {
        suggestions:[...suggestions],
      };
    },
    triggerCharacters: ["`",""],
  });
  languages.registerCompletionItemProvider("markdown", {
    provideCompletionItems(model, position, context, token) {
      const word = model.getWordUntilPosition(position);
      const suggestions = pseudocode.map((item) => ({
        ...item,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        },
      }));
      return {
        suggestions:[...suggestions],
      };
    },
    triggerCharacters: ["\\",""],
  });
}
