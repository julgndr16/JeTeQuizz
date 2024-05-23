import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./routes/App";
import QuizCreation from "./routes/QuizCreation";


export type IStore = {
  url : string;
};

export const store = createContext<IStore>({ url: "http://127.0.0.1:3001/" });

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
    element: <h1>Profile</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <store.Provider value={{ url: "http://127.0.0.1:3001/" }}>
      <RouterProvider router={router} />
    </store.Provider>
  </React.StrictMode>,
);
