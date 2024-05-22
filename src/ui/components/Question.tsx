import { useState } from "react";

export default function Question({ questionInfo, onClick }) {
  // state
  const [reponses, setReponses] = useState([
    { id: 1, nom: "Réponse 1" },
    { id: 2, nom: "Réponse 2" },
    { id: 3, nom: "Réponse 3" },
  ]);

  // comportements
  const handleDelete = () => {
    console.log("handleDelete");
  };

  // affichage (render)
  return (
    <li>
      {questionInfo.nom}
      <button onClick={onClick}>X</button>
      <ul>
        {reponses.map((reponse) => (
          <li key={reponse.id}>
            {reponse.nom}
            <button onClick={handleDelete}>X</button>
          </li>
        ))}
      </ul>
    </li>
  );
}
