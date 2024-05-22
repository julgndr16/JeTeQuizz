import {FunctionComponent} from "react";
import "../assets/style/Tile.css";
import logoAnswer from "../assets/img/logo-answer.svg";
import logoQuestion from "../assets/img/logo-question.svg";


type ITileProps = {
  question: string;
  nbQuestion: number;
  nbAnswer: number;
};

const Tile: FunctionComponent<ITileProps> = (props) => {
  return (
    <div className={"tile"} >
      <p className={"question"}>{props.question}</p>
      <div className={"bottom-card"}>
        <div>
          <img src={logoQuestion} alt={"question logo"}/>
          {props.nbQuestion}
        </div>
        <div>
          <img src={logoAnswer} alt={"answer logo"} />
          {props.nbAnswer}
        </div>
      </div>
    </div>
  );
};

export default Tile;
