export default function Header() {
  return (
    <>
      <div>
        <div className="terminal-index-content" contentEditable="false" suppressContentEditableWarning={true}>
          <div>
            <h1>有朋自远方来，不亦悦乎</h1>
            <h1>天行健，君子以自强不息</h1>
            <h1>地势坤，君子以厚德载物</h1>
          </div>
          <div className="terminal-index-box">
            <div className="terminal-index-box-left">
              <img src="/logo512.png" />
              <p className="terminal-name">heart-to-the-sea</p>
            </div>
            <div className="terminal-index-box-right">
              <p>QQ: 1911898144@qq.com</p>
              <p>github: heart-to-the-sea</p>
            </div>
          </div>
        </div>
        <div className="terminal-index-bkg"></div>
      </div>
    </>
  );
}
