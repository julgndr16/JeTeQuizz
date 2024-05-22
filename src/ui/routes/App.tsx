import { FunctionComponent, useContext, useEffect } from "react";
<<<<<<< HEAD
import Header from "./components/Header";
import Counter from "../components/Counter";
=======
import Counter from "./components/Counter";
import Header from "./components/Header";
import { Button } from "@mui/material";
>>>>>>> 2f1546d (front of the header)
import { store } from "../main";

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
    <div style={{
      backgroundColor: "#FBFBFB",
      width: "100vw",
      height: "100vh",
      display: "block",
      margin: "0 0",
      padding: "0 0",
    }}>
      <Header />
      {/*<h1>Material UI</h1>*/}
      {/*<Counter default_count={3} />*/}
      {/*<Button variant={"contained"}>Hello World</Button>*/}
    </div>
  );
};

export default App;
