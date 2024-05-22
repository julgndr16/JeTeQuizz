import { FunctionComponent, useContext, useEffect } from "react";
import Header from "../components/Header";
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
    </div>
  );
};

export default App;
