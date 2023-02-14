import { RouteObject } from "react-router-dom";
import Desktop from "../layouts/desktop";
import Vue from "@/pages/vue";

export default [
  {
    path: "/",
    element: <Desktop />,
  },
  {
    path: "/vue",
    element: <Vue />,
  },
] as RouteObject[];
