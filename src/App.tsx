import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tasks } from "./features/tasks/tasks";
import { AddTask } from "./features/tasks/addTask";
import { EditTask } from "./features/tasks/editTask"; // New EditTask component
import styles from "./App.module.css";

export const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        {/* Menu / Navigation */}
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <Link to="/add-task">Add Task</Link>
            </li>
          </ul>
        </nav>

        {/* Routing Setup */}
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} /> {/* EditTask route */}
        </Routes>
      </div>
    </Router>
  );
};
