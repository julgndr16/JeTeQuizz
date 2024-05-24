import { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "@mui/material/Button";
import { store } from "../StoreProvider";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ResultUser from "../components/ResultUser";
import '../assets/style/Play.css';
import TabScore from "../components/TabScore";
import loader from "../assets/img/loader.svg";

const Play = () => {
  const { currentQuizzId, setCurrentQuizzId, url } = useContext(store);
  const [questions, setQuestions] = useState([]);
  const [ nameQuizz, setNameQuizz] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [childData, setChildData] = useState();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [score, setScore] = useState(undefined);

  useEffect(() => {
    if (!currentQuizzId) {
      navigate("/");
    }
  }, [currentQuizzId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() =>{
        fetch(url + "quizz?id=" + currentQuizzId)
        .then((res) => res.json())
        .then((data) => {
          setNameQuizz(data.name);
          setQuestions(data.questions);
          setLoading(false);
        });
      }, 500);
    };
    fetchData();
  }, []);
  
  // useEffect(() => {
  //   if(answers.length == questions.length) {
  //     fetch(url + "game?idQuizz=" + currentQuizzId, {
  //       body: JSON.stringify({ answers: answers, idUser: 1}),
  //       method: "POST",
  //       })
  //       .then((res) => res.json())
  //       .then((data) => { console.log(data); })
  //   }
  // }, [answers]);
  //

  const handleAnswer = (selectedAnswerIndex) => {
    setChildData(selectedAnswerIndex);
  };

  const updateQuestion = () => {
    if (childData) {
      setAnswers([...answers, {idQuestion: currentQuestion.id ,idAnswer: parseInt(childData)}]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setChildData(undefined);
    }
    
  };

  const endQuizz = async () => {
    fetch(url + "game?idQuizz=" + currentQuizzId, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: [...answers,{idQuestion: currentQuestion.id ,idAnswer: parseInt(childData)}], idUser: 1}),
      method: "POST",
    }).then((res) => res.json()).then((data) => { makeScore(data);});


    // setCurrentQuizzId && setCurrentQuizzId(undefined);
  };

  const makeScore  = async (score_) => {
    console.log(score_);
    setScore(score_);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if(score){
    console.log("AFFICHAGE SCORE");
    console.log(score);
    const total = questions.length;
    return <div id="playbody"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  margin: 0,
                  padding: 0,
                  marginTop: "90px",
                }}>
                <Header />
                <h1>{nameQuizz}</h1>
      <ResultUser score={score.score} total={total} />
      <TabScore quizzId={currentQuizzId}/></div>;
  }

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
        marginTop: "90px",
      }}
    >
      {loading ? (
        <img src={loader} alt="Loading..." width={"50px"} />
      ) : (
        <>
          <Header />
          <h1>{nameQuizz}</h1>
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
              Next
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
        </>
      )}
    </div>
  );

};

export default Play;
