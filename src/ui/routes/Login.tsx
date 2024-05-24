import { FC, useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { store } from "../StoreProvider";
import { auth } from "../../server/routes/auth";
import { useStore } from "../hooks/useStore";

type ILoginProps = {
  // TODO
};

type IGoogleProfile = {
  id: string;
  email: string;
  name: string;
  picture: string;
  family_name: string;
  given_name: string;
  locale: string;
  verified_email: boolean;
};

const Login: FC<ILoginProps> = () => {
  const [tokens, setTokens] = useState<auth>();
  const [profile, setProfile] = useState<IGoogleProfile>();

  const { url } = useContext(store);

  const setUser = useStore((state) => state.setUser);

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
      setProfile(data);

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
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          id_token: tokens.id_token,
        });
        return;
      }
      console.log(dbUser);
      setUser({
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        id_token: tokens.id_token,
      });
    }
  };

  useEffect(() => {
    if (tokens) {
      fecthUserData();
    }
  }, [tokens]);

  const logOut = () => {
    googleLogout();
    setProfile(undefined);
    setUser({
      id: -1,
      name: "",
      email: "",
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
      <h2>React Google Login</h2>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </Box>
  );
};

export default Login;
