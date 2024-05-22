import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "@mui/material/Button";

const Play = () => {
  const [questions, setQuestions] = useState([
    {
      title: "Quelle est la capitale de la France ?",
      answers: ["Paris", "Londres", "Madrid", "Berlin"],
      total: 4,
    },
    {
      title: "Quelle est la capitale de l'Espagne ?",
      answers: ["Paris", "Rome", "Madrid", "Berlin"],
      total: 4,
    },
    {
      title: "Quelle est la capitale de l'Allemagne ?",
      answers: ["New York", "Londres", "Madrid", "Berlin"],
      total: 4,
    },
    {
      title: "Quelle est la capitale de l'Italie ?",
      answers: ["Lisbonne", "Londres", "Rome", "Berlin"],
      total: 4,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [childData, setChildData] = useState("");

  const handleAnswer = (selectedAnswerIndex) => {
    setChildData(selectedAnswerIndex);
    console.log("Reponse selectionnée : " + selectedAnswerIndex);
  };

  const updateQuestion = () => {
    if (childData != "") {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setChildData("");
    }
  };
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div
      id="playbody"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <h1>Les capitales du monde</h1>
      {currentQuestion && childData != "null" && (
        <QuestionCard
          title={currentQuestion.title}
          numQuestion={currentQuestionIndex + 1}
          answers={currentQuestion.answers}
          total={currentQuestion.total}
          onAnswer={handleAnswer}
        />
      )}
      {currentQuestionIndex < questions.length - 1 && (
        <Button
          variant="contained"
          style={{
            width: "calc(40vw + 30px)",
            backgroundColor: "#9B69FF",
            color: "white",
            paddingRight: 15,
            paddingLeft: 15,
          }}
          onClick={() => updateQuestion()}
        >
          Next 🢂
        </Button>
      )}
      {currentQuestionIndex == questions.length - 1 && (
        <Button
          variant="contained"
          style={{
            width: "100%",
            backgroundColor: "#9B69FF",
            color: "white",
            padding: 10,
          }}
          onClick={() => alert("End of the game")}
        >
          End of the game
        </Button>
      )}
    </div>
  );
};

export default Play;
