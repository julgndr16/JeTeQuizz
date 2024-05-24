import {useEffect, useState, useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardQuizz from "../components/CardQuizz";
import DialogQuizz from "../components/DialogQuizz";
import { store } from "../StoreProvider";
import Header from "../components/Header";


type IQuizz = {
  id: number;
  name: string;
  level: number;
  nbQuest: number;
  idCreator: number;
};

const Profile = () => {
  const {url } = useContext(store);
  const [open, setOpen] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState<IQuizz | null>(null);
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    fetch(url + "quizzes?creator=1"  )
      .then((res) => res.json())
      .then((data) => {
        console.log("TableQuizz :",data);
        setQuizzes(data.quizzes);
      });
  }, []);




  return (
    <div style={{}}>
      <Header />
      <h1 style={{marginTop:"90px"}}>Quizz de John Doe</h1>
      <div style={{ display: "flex", flexWrap:"wrap",justifyContent: "center", gap: 20 }}>
        {quizzes.map((quizz) => (
          <div>
          <CardQuizz quizz={quizz} url={url} />
          </div>
        ))}
      </div>


    </div>
  );
};

export default Profile;
