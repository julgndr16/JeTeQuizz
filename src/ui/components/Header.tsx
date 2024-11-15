import React, { FunctionComponent } from "react";
import { Box, Toolbar } from "@mui/material";
import logo from "../assets/img/logo.svg";
import "../assets/style/Header.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import Button from "@mui/material/Button";
import { googleLogout } from "@react-oauth/google";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleAccountNav = () => {
    user.id !== -1 ? navigate("/profile") : navigate("/login");
  };

  const logOut = () => {
    googleLogout();
    setUser({
      id: -1,
      name: "",
      email: "",
      profile_picture: "",
      access_token: "",
      refresh_token: "",
      id_token: "",
    });
  };

  return (
    <header>
      <Toolbar className={"toolbar"}>
        <button className={"je-te-quizz"} onClick={() => navigate("/")}>
          <img src={logo} width={20} />
          JeTeQuizz
        </button>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"row"}
          gap={1}
        >
          <button
            className={"account"}
            onClick={() => handleAccountNav()}
          ></button>
          {user.id !== -1 && (
            <Button
              onClick={() => logOut()}
              variant={"outlined"}
              color={"primary"}
            >
              logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </header>
  );
};

export default Header;
