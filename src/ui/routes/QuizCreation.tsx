import {useContext, useState} from "react";
import Question from "../components/creationQuizz/Question";
import QuestionForm from "../components/creationQuizz/QuestionForm";
import Header from "../components/Header";
import "../assets/style/createQuizz.css";
import { store } from "../StoreProvider";
import { useNavigate } from "react-router-dom";
import {Alert} from "@mui/material";
import loader from "../assets/img/loader.svg";

function QuizCreation() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const { url } = useContext(store);
  const [quizName, setQuizName] = useState("");
  const [quizLevel, setQuizLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    const questionsCopy = [...questions];
    const questionsCopyUpdated = questionsCopy.filter(
      (question) => question.id !== id
    );
    setQuestions(questionsCopyUpdated);
  };

  const handleAdd = (questionAAjouter) => {
    const questionsCopy = [...questions];
    questionsCopy.push({ ...questionAAjouter, reponses: [] });
    setQuestions(questionsCopy);
  };

  const handleCreate = () => {
    setIsLoading(true);

    const formattedQuestions = questions.map((question) => {
      return {
        question: question.nom,
        answers: question.reponses.map((reponse) => reponse.nom),
        correctAnswer: question.reponses.find(
          (reponse) => reponse.id === question.bonneReponseID
        )?.nom,
      };
    });

    const quizData = {
      name: quizName,
      level: quizLevel,
      questions: formattedQuestions,
      creator: 1,
    };
    setTimeout(() => {
    fetch(url + "quizz", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Quiz created successfully:", data);
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
        Alert(`Error creating quizz ...`);
        setIsLoading(false);
      });
    }, 500);
  };

  return (
    <div>
      <Header />

      <div className={"top-page"}>
        <input
          type="text"
          placeholder="quiz name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          className={"input-name"}
          required={true}
        />
        <input
          type="number"
          min="1"
          placeholder="quiz level"
          value={quizLevel}
          className={"input-level"}
          onChange={(e) => setQuizLevel(parseInt(e.target.value))}
          required={true}
        />
        {isLoading ? (
          <img src={loader} alt="Loading..." className={"create-btn"} width={"50px"}/>
        ) : (
          <button className={"create-btn"} onClick={handleCreate}>
            Create
          </button>
        )}
      </div>
      <ul>
        {questions.map((question) => (
          <Question
            questionInfo={question}
            onClick={() => handleDelete(question.id)}
            key={question.id}
          />
        ))}
      </ul>
      <QuestionForm handleAdd={handleAdd} />
    </div>
  );
}


export default QuizCreation;
