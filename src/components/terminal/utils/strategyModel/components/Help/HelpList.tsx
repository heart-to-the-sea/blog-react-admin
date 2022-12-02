import "./style/index.less";
interface Props {
  list: {
    name: string;
    doc: string;
  }[];
}
export default function HelpList(props: Props) {
  return (
    <>
      {props.list.map((item) => {
        return (
          <div className="terminal-help-node">
            <div className="left">{item.name}</div>
            <pre className="right">{item.doc}</pre>
          </div>
        );
      })}
    </>
  );
}
