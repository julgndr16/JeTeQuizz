import { Button } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import Counter from "./components/Counter";

const App: FunctionComponent = () => {
  useEffect(() => {
    console.log("App mounted");
    return () => {
      console.log("App unmounted");
    };
  }, []);

  return (
    <div>
      <h1>Material UI</h1>
      <Counter default_count={3} />
      <Button variant={"contained"}>Hello World</Button>
    </div>
  );
};

export default App;
