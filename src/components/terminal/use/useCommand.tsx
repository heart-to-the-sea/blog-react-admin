import { useState } from "react";

let commandList: string[] = [];
export default function useCommand() {
  const [command, setCommand] = useState<string[]>([]);
  return [command, setCommand];
}
