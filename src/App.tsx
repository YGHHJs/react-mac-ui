import { useRoutes } from "react-router-dom";
import router from "./router";

function App() {
  const ele = useRoutes(router);
  return <div>{ele}</div>;
}

export default App;
