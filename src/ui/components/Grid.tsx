import logoBlack from "../assets/img/logo-black.svg";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import "../assets/style/Grid.css";
import Tile from "./Tile";
import React from "react";
import { quizz } from "../../server/schemas/schemas";
import { store } from "../StoreProvider";

const Grid: FunctionComponent = () => {
  const { url } = useContext(store);

  useEffect(() => {
    const fetchData = async () => {
      fetch(url + "quizzes")
        .then((res) => res.json())
        .then((data) => setGrid(data));
    };
    fetchData();
  }, []);

  const [quizzes, setValues] = useState([]);

  const setGrid = (data: any[]) => {
    const values: any[] = [];
    data.quizzes.forEach((quizz: quizz) => {
      values.push(
        <Tile
          question={quizz.name}
          nbQuestion={quizz.nbQuestions}
          level={quizz.level}
          creator={quizz.creator.name}
        />,
      );
    });
    setValues(values);
  };

  return (
    <div className={"content"}>
      <button className={"new-quizz"}>
        <p className={"txt"}>New Quizz !</p>
        <img
          className={"logo"}
          src={logoBlack}
          alt={"black logo of jetequizz"}
        />
      </button>
      <div className={"grid"}>
        {quizzes.map((value, index) => (
          <React.Fragment key={index}>{value}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Grid;
