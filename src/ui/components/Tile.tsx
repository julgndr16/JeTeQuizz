import {FunctionComponent} from "react";
import "../assets/style/Tile.css";
import logoDifficulty from "../assets/img/difficulty.svg";
import logoQuestion from "../assets/img/logo-question.svg";


type ITileProps = {
  question: string;
  nbQuestion: number;
  level: number;
  creator: string;
};

const Tile: FunctionComponent<ITileProps> = (props) => {
  return (
    <div className={"tile"} >
      <div className={"top-card"}>
        <p className={"question"}>{props.question}</p>
        <p className={"creator"}><em>by</em> <span>{props.creator}</span> </p>
      </div>
      <div className={"bottom-card"}>
        <div>
          <img src={logoQuestion} alt={"question logo"}/>
          {props.nbQuestion}
        </div>
        <div>
          <img src={logoDifficulty} alt={"answer logo"} width={21}/>
          {props.level}
        </div>
      </div>
    </div>
  );
};

export default Tile;
