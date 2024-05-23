export default function Reponse({ reponseInfo, onClick }) {
  // state
  // comportements
  // affichage (render)
  return (
    <li>
      {reponseInfo.nom}
      <button onClick={onClick}>X</button>
    </li>
  );
}
