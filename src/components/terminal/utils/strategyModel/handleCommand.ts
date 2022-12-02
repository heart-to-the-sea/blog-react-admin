export interface HandleCommand {
  handler: (commandList: string[], content: HTMLDivElement) => Promise<any>;
}
