import { FC, useEffect, useState } from "react";

type ICounterProps = {
  default_count: number;
};

const Counter: FC<ICounterProps> = (props) => {
  const [count, setCount] = useState(props.default_count);

  useEffect(() => {
    console.log("Counter value changed to", count);
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{count}</p>
      <div>
        <button onClick={() => setCount(count + 1)}>Add</button>
        <button onClick={() => setCount(count - 1)}>Remove</button>
      </div>
    </div>
  );
};

export default Counter;
