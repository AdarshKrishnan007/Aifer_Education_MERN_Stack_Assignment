import React, { useState } from "react";
import api from "../services/api";
import "./TaskForm.css";

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/tasks", {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate || undefined,
        priority: form.priority,
      });
      onCreate(res.data);
      setForm({ title: "", description: "", dueDate: "", priority: "medium" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={onSubmit}>
      <h3 className="form-title"> Add New Task</h3>

      <div className="form-group">
        <input
          className="form-input"
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <input
          className="form-input"
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          className="form-input"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <select
          className="form-select"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button className="form-btn" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
