import { useState } from "react";

export default function QuestionForm({ handleAdd }) {
  // state
  const [nouvelleQuestion, setNouvelleQuestion] = useState("");

  // comportements
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const id = new Date().getTime();
    const nom = nouvelleQuestion;
    const questionAAjouter = { id, nom };
    handleAdd(questionAAjouter);
    setNouvelleQuestion("");
  };

  const handleChange = (event: { target: { value: any } }) => {
    setNouvelleQuestion(event.target.value);
  };

  // affichage (render)
  return (
    <form action={"submit"} onSubmit={handleSubmit} className={"question-form"}>
      <input
        value={nouvelleQuestion}
        type={"text"}
        placeholder={"Ajouter une question..."}
        onChange={handleChange}
        required={true}
      />
      <button>
        <p>New Question</p>
        <p>?</p>
      </button>
    </form>
  );
}
