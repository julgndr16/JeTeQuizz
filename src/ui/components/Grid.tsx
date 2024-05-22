import logoBlack from "../assets/img/logo-black.svg";
import {FunctionComponent} from "react";
import "../assets/style/Grid.css";
import Tile from "./Tile";
import React from "react";

const Grid: FunctionComponent = () => {

  const values = [
    <Tile
      question={"Tes connaissances avec les anmiaux ?"}
      nbQuestion={22}
      nbAnswer={13}
    />,<Tile
      question={"Tes connaissances avec les anmiaux ?"}
      nbQuestion={22}
      nbAnswer={13}
    />,<Tile
      question={"Tes connaissances avec les anmiaux ?"}
      nbQuestion={22}
      nbAnswer={13}
    />,<Tile
      question={"Tes connaissances avec les anmiaux ?"}
      nbQuestion={22}
      nbAnswer={13}
    />,<Tile
      question={"Tes connaissances avec les anmiaux ?"}
      nbQuestion={22}
      nbAnswer={13}
    />,<Tile
      question={"Tes connaissances avec les anmiaux ?"}
      nbQuestion={22}
      nbAnswer={13}
    />,

  ];

  return (
    <div className={"content"}>
      <button className={"new-quizz"}>
        <p className={"txt"}>
          New Quizz !
        </p>
          <img className={"logo"} src={logoBlack} alt={"black logo of jetequizz"} />
      </button>
      <div className={"grid"}>
        {values.map((value, index) => (
          <React.Fragment key={index}>
            {value}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Grid;
