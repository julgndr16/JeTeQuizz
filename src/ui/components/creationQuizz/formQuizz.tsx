import trash from "../../assets/img/trash.png";

export default function Reponse({
                                  reponseInfo,
                                  onClick,
                                  onSelect,
                                  isSelected,
                                }) {
  // state
  // comportements
  // affichage (render)
  return (
    <li className={"li-response"}>
      {reponseInfo.nom}
      <button className={"delete-response"} onClick={onClick}>
        <img src={trash} alt={"delete response"} />
      </button>
      <input type={"radio"} checked={isSelected} onChange={onSelect} />
    </li>
  );
}
