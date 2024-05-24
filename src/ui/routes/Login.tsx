import { FC, useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { store } from "../StoreProvider";
import { auth } from "../../server/routes/auth";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

type ILoginProps = {
  // TODO
};

const Login: FC<ILoginProps> = () => {
  const [tokens, setTokens] = useState<auth>();

  const { url } = useContext(store);

  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const res = await fetch(`${url}auth/google?code=${code}`, {
        method: "POST",
      });
      const tokens = await res.json();
      setTokens(tokens);
      console.log(tokens);
    },
    onError: (error) => alert(`Login failed: ${error}`),
    flow: "auth-code",
  });

  const fecthUserData = async () => {
    if (tokens) {
      const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();

      const user = await fetch(`${url}user?email=${data.email}`);
      const dbUser = await user.json();
      if (dbUser.error) {
        const user = await fetch(`${url}user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            token_expiration: tokens.expiry_date,
          }),
        });
        const newUser = await user.json();
        setUser({
          id: newUser.id ?? -1,
          name: newUser.name ?? "",
          email: newUser.email ?? "",
          access_token: tokens.access_token ?? "",
          refresh_token: tokens.refresh_token ?? "",
          id_token: tokens.id_token ?? "",
          profile_picture: data.picture ?? "",
        });
        return;
      }
      setUser({
        id: dbUser.id ?? -1,
        name: dbUser.name ?? "",
        email: dbUser.email ?? "",
        profile_picture: data.picture ?? "",
        access_token: tokens.access_token ?? "",
        refresh_token: tokens.refresh_token ?? "",
        id_token: tokens.id_token ?? "",
      });
    }
  };

  useEffect(() => {
    if (tokens) {
      fecthUserData().then(() => setTimeout(() => {
        navigate("/profile");
      }, 200));
    }
  }, [tokens]);

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
    <Box
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      <h2>Login</h2>
      {user.id !== -1 ? (
        <div>
          <img src={user.profile_picture} alt="profile" />
          <h3>User Logged in</h3>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button
          style={{
            padding: "10px 20px",
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
            border: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          onClick={() => {
            login();
          }}
        >
          <GoogleIcon color={"error"} />
          Sign in with Google
        </button>
      )}
    </Box>
  );
};

export default Login;
