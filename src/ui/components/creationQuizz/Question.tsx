import { useState, useEffect } from "react";
import Reponse from "./Reponse";
import ReponseForm from "./ReponseForm";
import trash from "../../assets/img/trash.png";

export default function Question({ questionInfo, onClick }) {
  const [reponses, setReponses] = useState(questionInfo.reponses || []);
  const [bonneReponseID, setBonneReponseID] = useState(questionInfo.bonneReponseID || null);

  useEffect(() => {
    questionInfo.reponses = reponses;
    questionInfo.bonneReponseID = bonneReponseID;
  }, [reponses, bonneReponseID, questionInfo]);

  const handleDelete = (id) => {
    const reponseCopy = [...reponses];
    const reponseCopyUpdated = reponseCopy.filter(
      (reponse) => reponse.id !== id
    );
    setReponses(reponseCopyUpdated);
  };

  const handleAdd = (reponseAAjouter) => {
    const reponseCopy = [...reponses];
    reponseCopy.push(reponseAAjouter);
    setReponses(reponseCopy);
  };

  const handleSelect = (id) => {
    setBonneReponseID(id);
  };

  return (
    <li className={"new-question"}>
      <p className={"question-name"}>{questionInfo.nom}</p>
      <button onClick={onClick} className={"delete-question"}>
        <img src={trash} alt={"delete the question"} />
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
