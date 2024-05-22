import { Button } from "@mui/material";
import { FunctionComponent, useContext, useEffect } from "react";
import Counter from "./components/Counter";
import { store } from "./main";

const App: FunctionComponent = () => {
  useEffect(() => {
    console.log("App mounted");
    return () => {
      console.log("App unmounted");
    };
  }, []);

  const s = useContext(store);
  console.log(s);

  return (
    <div>
      <h1>Material UI</h1>
      <Counter default_count={3} />
      <Button variant={"contained"}>Hello World</Button>
    </div>
  );
};

export default App;
