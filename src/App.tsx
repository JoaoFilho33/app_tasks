import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header>
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
      <Outlet />
      
    </>
  );
}

export { App };