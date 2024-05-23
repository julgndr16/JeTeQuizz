import Paper from "@mui/material/Paper";
import ScoreData from "./ScoreData";



const ResultUser = ({ user }) => {
  return (
    <Paper
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        padding: 15,
        marginBottom: 10,
        width: "40vw",
      }}
    >
      <ScoreData name="Score" value={100} color="success" />
    </Paper>
);
}

export default ResultUser;
