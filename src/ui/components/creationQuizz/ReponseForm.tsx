import { useState } from "react";

export default function ReponseForm({ handleAdd }) {
  // state
  const [nouvelleReponse, setNouvelleReponse] = useState("");

  // comportements
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = new Date().getTime();
    const nom = nouvelleReponse;
    const reponseAAjouter = { id, nom };
    handleAdd(reponseAAjouter);
    setNouvelleReponse("");
  };

  const handleChange = (event) => {
    setNouvelleReponse(event.target.value);
  };

  // affichage (render)
  return (
    <form action={"submit"} onSubmit={handleSubmit} className={"add-response"}>
      <input
        value={nouvelleReponse}
        type={"text"}
        placeholder={"Ajouter une réponse..."}
        onChange={handleChange}
        required={true}
      />
      <button>+</button>
    </form>
  );
}
