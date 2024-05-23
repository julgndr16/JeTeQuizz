import { useState } from "react";
import Reponse from "./Reponse";
import ReponseForm from "./ReponseForm";
import trash from "../../assets/img/trash.png";

export default function Question({ questionInfo, onClick }) {
  // state
  const [reponses, setReponses] = useState([
    // { id: 1, nom: "Réponse 1" }
  ]);

  const [bonneReponseID, setBonneReponseID] = useState(null);

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

  const handleSelect = (id) => {
    setBonneReponseID(id);
  };

  // affichage (render)
  return (
    <li className={"new-question"}>
      <p className={"question-name"}>{questionInfo.nom}</p>
      <button onClick={onClick} className={"delete-question"}>
        <img src={trash} alt={"delete the question"}/>
      </button>
      <ul className={"list-response"}>
        {reponses.map((reponse) => (
          <Reponse
            reponseInfo={reponse}
            onClick={() => handleDelete(reponse.id)}
            onSelect={() => handleSelect(reponse.id)}
            isSelected={bonneReponseID === reponse.id}
            key={reponse.id}
          />
        ))}
      </ul>
      <ReponseForm handleAdd={handleAdd} />
    </li>
  );
}
