import React from "react";
import { Task } from "../TasksPage/components/..";

export interface TaskDetailsProps {
  task: Task;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const formattedDate = task.created_at.toLocaleDateString();

  return (
    <div>
      <p>Details:</p>
      <p>Task ID: {task.id}</p>
      <p>Created: {task.name}</p>
      <p>Description: {task.description}</p>
      <p>Created At: {formattedDate}</p>
    </div>
  );
};