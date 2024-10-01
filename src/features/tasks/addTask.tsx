import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "./tasks.slice";
import { useNavigate } from "react-router-dom";

export const AddTask = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    text: "",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({
    text: "",
    date: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { text: "", date: "" };

    if (!form.text) {
      newErrors.text = "Task text is required.";
      isValid = false;
    } else if (form.text.length < 3) {
      newErrors.text = "Task text must be at least 3 characters.";
      isValid = false;
    }

    if (!form.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddTask = () => {
    if (validateForm()) {
      dispatch(addTask(form));
      setForm({ text: "", status: "pending", date: new Date().toISOString().split("T")[0] });
      navigate("/"); 
    }
  };

  return (
    <>
      <h1>Add Task</h1>
      <div>
        <input
          type="text"
          placeholder="Task text"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
        {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}

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
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </>
  );
};
