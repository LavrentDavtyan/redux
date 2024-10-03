import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITasks, IState } from "./types";

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const response = await fetch("http://localhost:5000/tasks");
  return (await response.json()) as ITasks[];
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<ITasks, "id">) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return (await response.json()) as ITasks;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (task: ITasks) => {
    const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return (await response.json()) as ITasks;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    return id;
  }
);

const initialState: IState = {
  items: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export const { reducer } = tasksSlice;
