import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editTask, getTasks } from "./tasks.slice";
import { ITasks } from "./types";

export const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const items = useAppSelector((state: { items: ITasks[] }) => state.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<ITasks, "id">>({
    text: "",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getTasks()).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (!isLoading && items.length > 0) {
      const taskToEdit = items.find((task) => task.id === id);
      if (taskToEdit) {
        setForm({
          text: taskToEdit.text,
          status: taskToEdit.status,
          date: taskToEdit.date,
        });
      }
    }
  }, [id, items, isLoading]);

  const handleEditTask = () => {
    if (id) {
      dispatch(editTask({ id: id, ...form }));
      navigate("/");
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1>Edit Task</h1>
      <div>
        <input
          type="text"
          placeholder="Task text"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button onClick={handleEditTask}>Save Changes</button>
      </div>
    </>
  );
};
