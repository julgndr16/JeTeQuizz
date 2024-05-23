import { useState } from "react";
import Question from "../components/creationQuizz/Question";
import QuestionForm from "../components/creationQuizz/QuestionForm";
import Header from "../components/Header";
import '../assets/style/createQuizz.css';

function QuizCreation() {
  // state
  const [questions, setQuestions] = useState([
    // { id: 1, nom: "Question Title 1" },
  ]);

  // comportements
  const handleDelete = (id: number) => {
    // 1. copie du state
    const questionsCopy = [...questions];

    // 2. manimulation du state
    const questionsCopyUpdated = questionsCopy.filter(
      (question) => question.id !== id,
    );

    // 3. modifier mon state avec le setter
    setQuestions(questionsCopyUpdated);
  };

  const handleAdd = (questionAAjouter) => {
    // 1. copie du state
    const questionsCopy = [...questions];

    // 2. manipulation du state
    questionsCopy.push(questionAAjouter);

    // 3. modifier mon state avec le setter
    setQuestions(questionsCopy);
  };

  // affichage (render)
  return (
    <div>
      <Header />
      <div className={"top-page"}>
        <h2>Name of the quiz</h2>
        <button className={"create-btn"}>
          Create
        </button>
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
