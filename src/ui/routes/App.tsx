import { FunctionComponent, useContext, useEffect } from "react";
import Header from "../components/Header";
import Grid from "../components/Grid";
import { store } from "../StoreProvider";

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
    <div
      style={{
        backgroundColor: "#FBFBFB",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        margin: "0 0",
        padding: "0 0",
      }}
    >
      <Header />
      <Grid />
    </div>
  );
};

export default App;
