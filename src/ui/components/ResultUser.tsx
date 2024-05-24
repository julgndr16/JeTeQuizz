import Paper from "@mui/material/Paper";
import ScoreData from "./ScoreData";


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
        <div style={{display:"inline"}}>
          <ScoreData name="Co" value={100} color="#9B69FF"/>
          <ScoreData name="Total Question" value={14} color="#9B69FF"/>
        </div>
        <div>
          <ScoreData name="Correct" value={props.score} color="#1F9C4A"/>
          <ScoreData name="Wrong" value={props.total - props.score} color="#D40000"/>
        </div>
        
  </Paper>
);
}

export default ResultUser;
