import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";

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
    path: "/quizCreation",
    element: <h1>Welcome to Quiz Creation !</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <store.Provider value={{ init: true }}>
      <RouterProvider router={router} />
    </store.Provider>
  </React.StrictMode>,
);
