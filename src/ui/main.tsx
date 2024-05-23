import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./routes/App";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

export type IStore = {
  init: boolean;
};

export const store = createContext<IStore>({ init: false });

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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={
      "6682931847-m9n28e91u7a0uk2eas82p7krn0mbnofq.apps.googleusercontent.com"
    }
  >
    <React.StrictMode>
      <store.Provider value={{ init: true }}>
        <RouterProvider router={router} />
      </store.Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
