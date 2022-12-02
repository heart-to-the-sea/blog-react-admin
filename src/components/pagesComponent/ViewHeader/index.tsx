import { FormEventHandler, useCallback, useEffect, useState } from "react";
import "./style/index.less";
import useSearchInput from "./useSearchInput";
export default function Header() {
  const { list, jumpToDom, handleInput, clearList } = useSearchInput(".preview");
  const [value, setValue] = useState("");
  let timeout = -1;
  const handleChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (event) => {
      clearList();
      const native = event.nativeEvent.target as HTMLInputElement;
      console.log(event);
      setValue(native.value || "");
      const data = native.value || "";
      if (timeout) {
        window.clearTimeout(timeout);
      }
      if (data === "" || data === undefined) {
        return;
      }
      timeout = window.setTimeout(() => {
        handleInput(data);
      });
    },
    [value]
  );
  useEffect(() => {
    clearList();
  }, [value]);
  return (
    <>
      <div className="view-header">
        <div className="header-content">
          <p className="header-button header-bottom-left">上一篇: 第一章 毁灭世界</p>
          <div className="input-header-box">
            <input className="header-input" onChange={handleChange}></input>
            {list.length ? (
              <div className="option">
                <div className="list-box">
                  {list.map((item) => (
                    <div style={{ width: "100%" }} key={item.html}>
                      <div
                        className="list-node"
                        onClick={jumpToDom(item)}
                        dangerouslySetInnerHTML={{ __html: item.html }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <p className="header-button header-bottom-right">下一篇: 第二章 完美世界</p>
        </div>
        {/* <div className='header-back-shadow'></div> */}
        {/* <div className='header-back'></div> */}
      </div>
    </>
  );
}
