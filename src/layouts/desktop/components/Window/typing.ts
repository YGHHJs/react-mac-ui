import { RouteObject } from "react-router-dom";

type LinkRoute = {
  path: string;
  handle: any;
};

export interface WindowProps {
  menus: RouteObject | LinkRoute;
}
