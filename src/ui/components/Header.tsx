import { FunctionComponent } from "react";
import { Toolbar } from "@mui/material";
import logo from "../assets/img/logo.svg";
import "../assets/style/Header.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();

  const user = useStore((state) => state.user);

  const handleAccountNav = () => {
    user.id !== -1 ? navigate("/profile") : navigate("/login");
  };

  return (
    <header>
      <Toolbar className={"toolbar"}>
        <button className={"je-te-quizz"} onClick={() => navigate("/")}>
          <img src={logo} width={20} />
          JeTeQuizz
        </button>
        <button
          className={"account"}
          onClick={() => handleAccountNav()}
        ></button>
      </Toolbar>
    </header>
  );
};

export default Header;
