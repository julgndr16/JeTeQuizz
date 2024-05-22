import {FunctionComponent} from "react";
import {Toolbar} from "@mui/material";
import logo from '../assets/img/logo.svg';
import "../assets/style/Header.css";

const Header: FunctionComponent = () => {
  return (
    <header>
      <Toolbar className={"toolbar"}>
        <button className={"je-te-quizz"}>
          <img src={logo} width={20}/>
          JeTeQuizz
        </button>
        <button className={"account"}></button>
      </Toolbar>
    </header>
  );
}

export default Header;
