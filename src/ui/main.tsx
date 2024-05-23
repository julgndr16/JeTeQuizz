import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./routes/App";
import StoreProvider from "./StoreProvider";

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
    element: <h1>Profile</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider url={"http://127.0.0.1:3001/"}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
);
