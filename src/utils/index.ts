export * from "./url";

export interface CatalogueNode {
  id: string;
  path: string;
  name: string;
  children?: CatalogueNode[];
}
export namespace Catalogue {
  export function htmlToJson(html: string) {
    const container = document.createElement("div");
    container.innerHTML = html;
    const root = container.querySelector<HTMLDivElement>("#toc")?.children[0] as HTMLUListElement;
    const list: CatalogueNode[] = [];
    if (root) {
      htmlToJsonDeep(root, list);
    }
    console.log(JSON.stringify(list),'->')
    return list;
  }
  function htmlToJsonDeep(root: HTMLUListElement, list: CatalogueNode[]) {
    const rootList = Object.values(root.children) as HTMLUListElement[];
    rootList.forEach((item) => {
      const a = item.querySelector("a");
      const ul = item.querySelector("ul");
      let node: CatalogueNode = {
        id: "",
        path: "",
        name: "",
        children: undefined,
      };
      if (a) {
        node.id = a.href.replace(window.location.origin + window.location.pathname, "");
        node.path = a.href;
        node.name = a.innerHTML;
      }
      if (ul) {
        node.children = [];
        htmlToJsonDeep(ul, node.children);
      }
      list.push(node);
      return list;
    });
  }
}



