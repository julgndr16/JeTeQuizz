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
      <Counter default_count={3} />
    </div>
  );
};

export default App;
