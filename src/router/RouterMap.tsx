import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import ClassPage from "../pages/class";
import Edit from "../pages/edit";
import IndexPage from "../pages/index";
import Terminal from "../pages/terminal";
import View from "../pages/view";
const routers: RouteObject[] = [
  {
    path: "",
    element: <IndexPage />,
  },
  {
    path: "terminal",
    element: <Terminal />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/class",
    element: <ClassPage />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/view/:id",
    element: <View />,
  },
];
export const ROUTER_LIST = createBrowserRouter(routers);
export default function RouterMap() {
  return <RouterProvider router={ROUTER_LIST}></RouterProvider>;
}
