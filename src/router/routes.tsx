import { createBrowserRouter } from "react-router-dom";
import { TasksPage } from "../pages/TasksPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFound";
import { App } from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);