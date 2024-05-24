import { FunctionComponent, useContext } from "react";
import "../assets/style/Tile.css";
import logoDifficulty from "../assets/img/difficulty.svg";
import logoQuestion from "../assets/img/logo-question.svg";
import { store } from "../StoreProvider";
import { useNavigate } from "react-router-dom";

type ITileProps = {
  quizzId: number;
  question: string;
  nbQuestion: number;
  level: number;
  creator: string;
};

const Tile: FunctionComponent<ITileProps> = (props) => {
  const { setCurrentQuizzId } = useContext(store);
  const navigate = useNavigate();
  return (
    <div
      className={"tile"}
      onClick={() => {
        setCurrentQuizzId && setCurrentQuizzId(props.quizzId);
        navigate("/play");
      }}
    >
      <div className={"top-card"}>
        <p className={"question"}>{props.question}</p>
        <p className={"creator"}>
          <em>by</em> <span>{props.creator}</span>{" "}
        </p>
      </div>
      <div className={"bottom-card"}>
        <div>
          <img src={logoQuestion} alt={"question logo"} />
          {props.nbQuestion}
        </div>
        <div>
          <img src={logoDifficulty} alt={"answer logo"} width={21} />
          {props.level}
        </div>
      </div>
    </div>
  );
};

export default Tile;
