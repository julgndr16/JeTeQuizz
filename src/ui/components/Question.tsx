export default function Question({ questionInfo, onClick }) {
  // state

  // comportements

  // affichage (render)
  return (
    <li>
      {questionInfo.nom} <button onClick={onClick}>X</button>
    </li>
  );
}
