import COMMAND from "../../use/command";
import { HandleCommand } from "./handleCommand";
import HandleClear from "./handlers/handleClear";
import HandleCreate from "./handlers/handleCreate";
import HandleError from "./handlers/handleError";
import HandleHelp from "./handlers/handleHelp";
import HandleIndex from "./handlers/handleIndex";
import HandlerLS from "./handlers/handleLS";

export class Context implements HandleCommand {
  private handleCommandMap = new Map<string, HandleCommand>();
  public register(key: string, handler: HandleCommand) {
    this.handleCommandMap.set(key, handler);
  }
  async handlerCtx(command: string, content: HTMLDivElement) {
    const commandList = command.split(" ");
    return this.handler(commandList, content);
  }
  async handler(commandList: string[], content: HTMLDivElement) {
    if (!this.handleCommandMap.has(commandList[0]) || commandList[0] === COMMAND.ERROR) {
      const handler = this.handleCommandMap.get(COMMAND.ERROR);
      return handler?.handler(commandList, content);
    }
    const handler = this.handleCommandMap.get(commandList[0]);
    return handler?.handler(commandList, content);
  }
}
const ctx = new Context();
ctx.register(COMMAND.CLEAR, new HandleClear());
ctx.register(COMMAND.ERROR, new HandleError());
ctx.register(COMMAND.LS, new HandlerLS());
ctx.register(COMMAND.CREATE, new HandleCreate());
ctx.register(COMMAND.INDEX, new HandleIndex());
ctx.register(COMMAND.HELP, new HandleHelp());
export const context = ctx;
