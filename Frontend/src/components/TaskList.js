import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <p>No tasks found.</p>;
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
