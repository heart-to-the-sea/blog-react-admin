import { useEffect, useState } from "react";
import ProblemLogTip from "./components/ProblemLogTip";
import useIcons from "./plugins/useIcons";
import RouterMap from "./router/RouterMap";
import "./app.less";
import "antd/dist/reset.css";
function App() {
  useIcons();
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const _push = window.history.pushState;
    const _replace = window.history.replaceState;
    window.history.pushState = (data: any, unused: string, url?: string | URL | null | undefined) => {
      _push(data, unused, url);
      setVisible(0);
    };
    window.history.replaceState = (data: any, unused: string, url?: string | URL | null | undefined) => {
      _replace(data, unused, url);
      setVisible(0);
    };
    return () => {
      window.history.pushState = _push;
      window.history.replaceState = _replace;
    };
  }, []);
  return (
    <div id="App">
      <RouterMap />
      {/* <ProblemLogTip
        visible={visible}
        onToggle={(v) => {
          setVisible(v);
        }}
      /> */}
    </div>
  );
}

export default App;
