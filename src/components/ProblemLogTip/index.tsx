import "./style/index.less";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DOcSetting from "./componse/DocSetting/DocSetting";
import { useLocation } from "react-router-dom";

interface Props {
  visible: number;
  onToggle?: (visible: number) => void;
}
type PropTypesMap = PropTypes.ValidationMap<Props>;

const propTypes: PropTypesMap = {
  visible: PropTypes.number.isRequired,
};
ProblemLogTip.propTypes = propTypes;

export default function ProblemLogTip(props: Props) {
  const [right, setRight] = useState(-500);
  const [boxWidthMax, setBoxWidthMax] = useState(0);
  const [leftWidth, setLeftWidth] = useState(150);
  const [listVisible, setListVisible] = useState(0);
  const [docSettingVisible, setDocSettingVisible] = useState(0);
  const handleToggle = () => {
    props.onToggle && props.onToggle(props.visible ? 0 : 1);
    setBoxWidthMax(0);
  };
  const handleListToggle = () => {
    setLeftWidth(listVisible ? 0 : 150);
    setListVisible(listVisible ? 0 : 1);
  };
  const handleMaxWidth = () => {
    if (props.visible) {
      setBoxWidthMax(1);
    }
  };
  const handleDocConfig = () => {
    props.onToggle && props.onToggle(1);
    setDocSettingVisible(1);
  };
  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    if (path === "edit" && props.visible) {
      handleDocConfig();
    } else {
      setDocSettingVisible(0);
    }
    setRight(props.visible ? 0 : -500);
    setLeftWidth(props.visible ? 0 : 150);
    setListVisible(props.visible ? 0 : 1);
    setBoxWidthMax(props.visible ? 1 : 0);
  }, [props]);
  return (
    <>
      {
        <div className="problem-tip-log" style={{ right, width: boxWidthMax ? "50%" : "" }}>
          <div className="left-tip left-problem-tip" onClick={handleToggle}>
            问题列表
          </div>
          {props.visible && (
            <div className="left-tip left-problem-date-tip" onClick={handleListToggle}>
              日志列表
            </div>
          )}
          {props.visible && (
            <div className="left-tip left-problem-big-tip" onClick={handleMaxWidth}>
              超级列表
            </div>
          )}
          {docSettingVisible && (
            <div className="left-tip left-problem-doc-setting-tip" onClick={handleDocConfig}>
              文章设置
            </div>
          )}
          <div className="problem-tip-box">
            {/* <div className="problem-tip-left-box" style={{ width: leftWidth }}>
              <ul>
                <li>2020年05月09日</li>
                <li className="active">2020年05月09日</li>
                <li>2020年05月09日</li>
                <li>2020年05月09日</li>
                <li>2020年05月09日</li>
              </ul>
            </div>
            <div className="problem-tip-right-box">
              <textarea></textarea>
            </div> */}
            {docSettingVisible && <DOcSetting />}
          </div>
        </div>
      }
    </>
  );
}
