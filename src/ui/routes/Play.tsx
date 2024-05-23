import React, {useContext, useState} from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "@mui/material/Button";
import {store} from "../main";





const Play = () => {

    const {init} = useContext(store);


  const [questions, setQuestions] = useState([
    {
      title: "Quelle est la capitale de la France ?",
      answers: [{id: 1, name: "Paris"}, {id: 2, name: "Londres"}, {id: 3, name: "Lisbonne"}, {id: 4, name: "Berlin"}],
      total: 4,
    },
    {
      title: "Quelle est la capitale de l'Espagne ?",
      answers: [{id: 5, name: "Paris"}, {id: 6, name: "Madrid"}, {id: 7, name: "New York"}, {id: 8, name: "Berlin"}],
      total: 4,
    },
    {
      title: "Quelle est la capitale de l'Allemagne ?",
      answers: [{id: 9, name: "Dublin"}, {id: 10, name: "Londres"}, {id: 11, name: "Berlin"}, {id: 12, name: "Rome"}],
      total: 4,
    },
    {
      title: "Quelle est la capitale de l'Italie ?",
      answers: [{id: 13, name: "Paris"}, {id: 14, name: "Londres"}, {id: 15, name: "Rome"}, {id: 16, name: "Berlin"}],
      total: 4,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [childData, setChildData] = useState<number|undefined>();
  const [answers, setAnswers] = useState<Array<number>>([]);
  const handleAnswer = (selectedAnswerIndex) => {
    setChildData(selectedAnswerIndex);
    setAnswers([...answers, selectedAnswerIndex]);
    console.log("Reponse selectionnée : " + selectedAnswerIndex);
  };

  const updateQuestion = () => {
    if (childData) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setChildData(undefined);
    }

  };
   const endQuizz = async () => {
       if (childData) {
           setCurrentQuestionIndex(currentQuestionIndex + 1);
           setChildData(undefined);
       }
       const res = await fetch(`http://localhost:3001/game?${0}`, {body:JSON.stringify({answers}), method: "POST"})
   }
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
      {currentQuestion && currentQuestionIndex != questions.length && (
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
              width: "calc(40vw + 30px)",
            backgroundColor: "#9B69FF",
            color: "white",
              paddingRight: 15,
              paddingLeft: 15,          }}
          onClick={() => endQuizz()}
        >
          Finishhhh !
        </Button>
      )}
    </div>
  );
};

export default Play;
