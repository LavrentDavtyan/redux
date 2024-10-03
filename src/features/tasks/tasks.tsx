import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTasks, deleteTask } from "./tasks.slice";
import styles from "./tasks.module.css";
import { ITasks } from "./types";

export const Tasks = () => {
  const items = useAppSelector((state: { items: ITasks[] }) => state.items);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = items.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const totalTasks = items.length;
  const pendingTasks = items.filter((task) => task.status === "pending").length;
  const completedTasks = items.filter((task) => task.status === "completed").length;
  const inProgressTasks = items.filter((task) => task.status === "progress").length;

  return (
    <>
      <h1>Tasks</h1>

      <div>
        <p>Pending: {pendingTasks}/{totalTasks}</p>
        <p>Completed: {completedTasks}/{totalTasks}</p>
        <p>In Progress: {inProgressTasks}/{totalTasks}</p>
      </div>

      <div>
        <label htmlFor="task-filter">Filter by status: </label>
        <select
          id="task-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className={styles.list}>
        {filteredTasks.map((task) => (
          <div key={task.id}>
            <h1>{task.text}</h1>
            <p>{task.status}</p>
            <p>{task.date}</p>
            <Link to={`/edit-task/${task.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};
