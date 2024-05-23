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
    <li>
      <input type={"checkbox"} checked={isSelected} onChange={onSelect} />
      {reponseInfo.nom}
      <button onClick={onClick}>X</button>
    </li>
  );
}
