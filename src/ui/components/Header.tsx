import {FunctionComponent} from "react";
import {Toolbar} from "@mui/material";
import logo from '../assets/img/logo.svg';
import "../assets/style/Header.css";
import { useNavigate } from "react-router-dom";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Toolbar className={"toolbar"}>
        <button className={"je-te-quizz"} onClick={() => navigate("/")}>
          <img src={logo} width={20}/>
          JeTeQuizz
        </button>
        <button className={"account"}></button>
      </Toolbar>
    </header>
  );
}

export default Header;
