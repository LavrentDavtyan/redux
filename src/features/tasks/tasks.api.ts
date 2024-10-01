import { ITasks } from "./types";

export const getDummyTasks = async (): Promise<ITasks[]> => {
  const response = await fetch("http://localhost:5000/tasks");
  
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks: ITasks[] = await response.json();
  
  return tasks;
};
