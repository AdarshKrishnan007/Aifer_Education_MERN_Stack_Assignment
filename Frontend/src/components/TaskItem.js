import React, { useState } from "react";
import api from "../services/api";
import "./TaskItem.css";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
  });

  const toggleComplete = async () => {
    const res = await api.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    onUpdate(res.data);
  };

  const save = async () => {
    const res = await api.put(`/tasks/${task._id}`, {
      title: form.title,
      description: form.description,
    });
    onUpdate(res.data);
    setEditing(false);
  };

  const remove = async () => {
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div
      className={`task-card ${
        task.status === "completed" ? "completed" : "pending"
      }`}
    >
      {editing ? (
        <div className="task-edit">
          <input
            className="task-input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="task-input"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="task-actions">
            <button className="btn save" onClick={save}>
              Save
            </button>
            <button className="btn cancel" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h4
              className={`task-title ${
                task.status === "completed" ? "strike" : ""
              }`}
            >
              {task.title}
            </h4>
            <span className={`priority-tag ${task.priority}`}>
              {task.priority}
            </span>
          </div>

          <p className="task-desc">{task.description}</p>

          <div className="task-meta">
            {task.dueDate && (
              <small> {new Date(task.dueDate).toLocaleDateString()}</small>
            )}
            <small
              className={
                task.status === "completed" ? "status completed" : "status"
              }
            >
              {task.status}
            </small>
          </div>

          <div className="task-actions">
            <button className="btn toggle" onClick={toggleComplete}>
              {task.status === "completed" ? " Mark Pending" : " Mark Done"}
            </button>
            <button className="btn edit" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="btn delete" onClick={remove}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
