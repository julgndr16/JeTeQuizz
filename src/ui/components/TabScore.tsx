import Paper from "@mui/material/Paper";
import {FC, useContext, useEffect,useState} from "react";
import { store } from "../StoreProvider";
import "../assets/style/scoreBoard.css";


type TabScoreProps = {
  quizzId: number;

};


const TabScore : FC<TabScoreProps> = (props)=> {
  const {url } = useContext(store);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    fetch(url + "scores?idQuizz=" + props.quizzId )
      .then((res) => res.json())
      .then((data) => {
        console.log("Tabscore :",data);
        setScores(data);
      });
  }, []);
  return (
    <div>
      <h3 className={"title-scoreboard"}>Table of scores</h3>
      <Paper
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: 15,
          marginBottom: 10,
          width: "40vw",
          display: "flex",
        }}>
        <table style={{width:"100%"}} className={"table-score"}>
          <thead>
            <tr style={{textAlign:"left", }}>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{score.user.name}</td>
                <td style={{justifyContent:"flex-end"}}>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </div>
  );
}
export default TabScore;
