import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTasks, deleteTask } from "./tasks.slice";
import styles from "./tasks.module.css";
import { ITasks } from "./types";

export const Tasks = () => {
  const items = useAppSelector((state: { items: ITasks[] }) => state.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      <h1>Tasks</h1>

      <div className={styles.list}>
        {items.map((task) => (
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
