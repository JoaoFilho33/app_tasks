import React from "react";
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFound";
import { Task, TasksPage } from "./pages/TasksPage";
import { TaskDetails } from "./pages/TaskDetails";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";
import { useEffect, useMemo, useState } from "react";

function App() {
  const { signout, isAuthenticated, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { id: taskId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchData();
  }, []);

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ? (
        <p>
          {user!.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
      ) : (
        <p>Olá Visitante!</p>
      )
    );
  }, [isAuthenticated]);

  const taskToDisplay = tasks.find(task => task.id === taskId);

  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Tasks</h1>
          <span>{authBlock}</span>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={<ProtectedRoute> <TasksPage /> </ProtectedRoute>}
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                {taskToDisplay ? (
                  <TaskDetails task={taskToDisplay} />
                ) : (
                  <p>Tarefa não encontrada</p>
                )}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export { App };