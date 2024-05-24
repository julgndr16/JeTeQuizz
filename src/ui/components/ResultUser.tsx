import Paper from "@mui/material/Paper";
import ScoreData from "./ScoreData";
import "../assets/style/scoreBoard.css";


type ResultUserProps = {
  score: number;
  total: number;
};
const ResultUser: FC<ResultUserProps> = (props) => {
  return (
  <Paper
    style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: 15,
          marginBottom: 10,
          width: "40vw",
        }}
      >
        <div style={{display:"flex",flexWrap:"wrap", fontFamily:"Quicksand"}}>
          <ScoreData  name="Completion" value={props.score*100/props.total+"%"} color="#9B69FF"/>
          <ScoreData name="Total Question" value={props.total} color="#9B69FF"/>

          <ScoreData name="Correct" value={props.score} color="#1F9C4A"/>
          <ScoreData name="Wrong" value={props.total - props.score} color="#D40000"/>
        </div>
        
  </Paper>
);
}

export default ResultUser;
