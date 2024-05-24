import logoBlack from "../assets/img/logo-black.svg";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import "../assets/style/Grid.css";
import Tile from "./Tile";
import { quizz } from "../../server/schemas/schemas";
import { store } from "../StoreProvider";
import { useNavigate } from "react-router-dom";

const Grid: FunctionComponent = () => {
  const { url } = useContext(store);
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<Array<quizz>>([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(url + "quizzes")
        .then((res) => res.json())
        .then((data) => setQuizzes(data.quizzes));
    };
    fetchData();
  }, []);

  return (
    <div className={"content"}>
      <button className={"new-quizz"} onClick={() => navigate("/quizCreation")}>
        <p className={"txt"}>New Quizz !</p>
        <img
          className={"logo"}
          src={logoBlack}
          alt={"black logo of jetequizz"}
        />
      </button>
      <div className={"grid"}>
        {quizzes &&
          quizzes.map((quizz_, index) => (
            <Tile
              key={index}
              quizzId={quizz_.id}
              question={quizz_.name}
              nbQuestion={quizz_.nbQuestions}
              level={quizz_.level}
              creator={quizz_.creator.name}
            />
          ))}
      </div>
    </div>
  );
};

export default Grid;
