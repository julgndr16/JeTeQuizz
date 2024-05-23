import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./routes/App";
import StoreProvider from "./StoreProvider";
import Play from "./routes/Play";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <h1>This is what it is about !</h1>,
  },
  {
    path: "/quizCreation",
    element: <QuizCreation />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/play",
    element: <Play />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={
      "6682931847-m9n28e91u7a0uk2eas82p7krn0mbnofq.apps.googleusercontent.com"
    }
  >
    <React.StrictMode>
      <StoreProvider url={"http://127.0.0.1:3001/"}>
        <RouterProvider router={router} />
      </StoreProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
