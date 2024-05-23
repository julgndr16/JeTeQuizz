import { useState } from "react";
import Reponse from "./Reponse";
import ReponseForm from "./ReponseForm";

export default function Question({ questionInfo, onClick }) {
  // state
  const [reponses, setReponses] = useState([
    // { id: 1, nom: "Réponse 1" }
  ]);

  // comportements
  const handleDelete = (id) => {
    // 1. copie du state
    const reponseCopy = [...reponses];

    // 2. manimulation du state
    const reponseCopyUpdated = reponseCopy.filter(
      (reponse) => reponse.id !== id,
    );

    // 3. modifier mon state avec le setter
    setReponses(reponseCopyUpdated);
  };

  const handleAdd = (reponseAAjouter) => {
    // 1. copie du state
    const reponseCopy = [...reponses];

    // 2. manipulation du state
    reponseCopy.push(reponseAAjouter);

    // 3. modifier le state avec le setter
    setReponses(reponseCopy);
  };

  // affichage (render)
  return (
    <li>
      {questionInfo.nom}
      <button onClick={onClick}>X</button>
      <ul>
        {reponses.map((reponse) => (
          <Reponse
            reponseInfo={reponse}
            onClick={() => handleDelete(reponse.id)}
            key={reponse.id}
          />
        ))}
      </ul>
      <ReponseForm handleAdd={handleAdd} />
    </li>
  );
}