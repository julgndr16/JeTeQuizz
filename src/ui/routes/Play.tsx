import { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "@mui/material/Button";
import { store } from "../StoreProvider";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const { currentQuizzId, setCurrentQuizzId, url } = useContext(store);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentQuizzId) {
      navigate("/");
    }
  }, [currentQuizzId]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(url + "quizz?id=" + currentQuizzId)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setQuestions(data.questions);
        });
      // setQuestions(data.questions);
    };
    fetchData();
  }, );

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [childData, setChildData] = useState<number | undefined>();
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
    const res = await fetch(`http://localhost:3001/game?${currentQuizzId}`, {
      body: JSON.stringify({ answers }),
      method: "POST",
    });
    setCurrentQuizzId && setCurrentQuizzId(undefined);
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
      {/*<h1>Les capitales du monde</h1>*/}
      {currentQuestion && currentQuestionIndex != questions.length && (
        <QuestionCard
          title={currentQuestion.question}
          numQuestion={currentQuestionIndex + 1}
          answers={currentQuestion.answers}
          total={questions.length}
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
            paddingLeft: 15,
          }}
          onClick={() => endQuizz()}
        >
          Finishhhh !
        </Button>
      )}
      {currentQuestionIndex == questions.length && (
        <h1>Quizz terminé</h1>
      )}
    </div>
  );
};

export default Play;
