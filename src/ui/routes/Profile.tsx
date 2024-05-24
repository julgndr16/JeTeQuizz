import { useContext, useEffect, useState } from "react";
import CardQuizz from "../components/CardQuizz";
import { store } from "../StoreProvider";
import Header from "../components/Header";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import "../assets/style/profile.css";

type IQuizz = {
  id: number;
  name: string;
  level: number;
  nbQuest: number;
  idCreator: number;
};

const Profile = () => {
  const { url } = useContext(store);
  const [open, setOpen] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState<IQuizz | null>(null);
  const [quizzes, setQuizzes] = useState([]);

  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === -1) {
      navigate("/login");
    }

    fetch(`${url}quizzes?creator=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TableQuizz :", data);
        setQuizzes(data.quizzes);
      });
  }, []);

  return (
    <div style={{}}>
      <Header />
      <h1 style={{ marginTop: "90px" }}>Quizzes de {user.name}</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
        }}
      >
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
