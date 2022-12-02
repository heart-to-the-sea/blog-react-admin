export interface LocalSearchI {
  // 查询
  queryTextDom(): LocalSearch;
  // 设置根节点
  setRootDom(dom: string): LocalSearch;
  // 标记
  mark(): void;
  // 取消标记
  cleanMark(): void;
}

export class LocalSearch implements LocalSearchI {
  static readonly TEXT_NODE_TYPE = 3;
  private root!: HTMLElement;
  private searchStr!: string;
  private lastSearchStr = "";
  private rootName!: string;
  private textNodeList: Text[] = [];
  setRootDom(dom: string) {
    this.rootName = dom;
    return this;
  }
  setSearchStr(str: string) {
    this.cleanMark();
    this.searchStr = str;
    return this;
  }
  private searchRoot() {
    this.root = document.querySelector(this.rootName) as HTMLElement;
  }
  queryTextDom() {
    if (this.searchStr == undefined && this.searchStr === "") return this;
    this.searchRoot();
    const textList: Text[] = [];
    this._queryTextDom(this.root, LocalSearch.TEXT_NODE_TYPE, textList);
    this.textNodeList = textList.filter((item) => !!item);
    return this;
  }
  private _queryTextDom(dom: HTMLElement | Text | ChildNode, type: number, textList: Text[]) {
    if (dom instanceof Text && dom.nodeType === type && !this.hasNoSearchElement(dom.parentElement)) {
      if (dom.data.includes(this.searchStr)) {
        console.log(dom);
        textList.push(dom);
      }
    }
    console.log(dom.childNodes);
    if (dom.childNodes) {
      for (const node of Array.from(dom.childNodes)) {
        this._queryTextDom(node, type, textList);
      }
    }
  }
  mark() {
    console.log(this.textNodeList);
    this._mark(this.textNodeList, this.searchStr);
  }
  private _mark(textList: Text[], searchStr: string) {
    textList.forEach((item) => {
      try {
        // const parent = item.parentNode as HTMLDivElement;
        // parent &&
        //   parent.classList &&
        //   parent.classList.add &&
        //   parent.classList.add("mark-parent");
        // parent.innerHTML = parent.innerHTML.replace(
        //   searchStr,
        //   `<span class="mark">$&</span>`
        // );
        const childNodes = Array.from(item.parentElement?.childNodes || []);
        const index = this.getDomIndex(childNodes, item);
        if (index !== -1) {
          const span = document.createElement("span");
          span.classList.add("parcel");

          span.innerHTML = item.data.replace(searchStr, `<span class="mark">$&</span>`);
          item.parentElement?.replaceChild(span, item);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  cleanMark() {
    console.log(this.textNodeList);
    this._cleanMark(this.textNodeList);
    this.textNodeList = [];
  }
  private _cleanMark(textList: Text[]) {
    const reg = new RegExp(`<span class="mark">(` + this.lastSearchStr + `)<\/span>`, "gi");
    try {
      document.querySelectorAll<HTMLDivElement>(".parcel").forEach((item) => {
        item.innerHTML = item.innerHTML.replaceAll(reg, "$1");
        const text = document.createTextNode(item.innerText);
        item.parentElement?.replaceChild(text, item);
      });
    } catch (e) {
      console.error(e);
    }
    this.lastSearchStr = this.searchStr;
  }
  private hasNoSearchElement(el: HTMLUnknownElement | null) {
    if (["STYLE", "SVG"].includes(el?.nodeName || "")) {
      return true;
    }
    return false;
  }
  private getDomIndex(list: ChildNode[], node: Text) {
    return [].indexOf.call<any, any, any>(list, node);
  }
}
export default LocalSearch;
