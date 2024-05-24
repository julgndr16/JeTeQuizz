import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  TokenResponse,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";

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
  const [token, setToken] = useState<TokenResponse>();
  const [profile, setProfile] = useState<IGoogleProfile>();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse);
    },
    onError: (error) => alert(`Login failed: ${error}`),
  });

  useEffect(() => {
    if (token) {
      console.log(token);
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
          },
        },
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setProfile(data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  const logOut = () => {
    googleLogout();
    setProfile(undefined);
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
