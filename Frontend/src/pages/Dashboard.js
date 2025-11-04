import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const q = {};
    if (filter !== "all") q.status = filter;
    if (search) q.search = search;
    const params = new URLSearchParams(q).toString();
    const res = await api.get(`/tasks?${params}`);
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, search]);

  const handleCreate = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleUpdate = (updated) => {
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const total = tasks.length;
  const percent = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2 className="dashboard-title">
          Welcome, <span>{user?.name}</span>
        </h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-controls">
          <input
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="task-section">
          <div className="progress-container">
            <p className="progress-label">Completed: {Math.round(percent)}%</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${percent}%` }}></div>
            </div>
          </div>
          <TaskForm onCreate={handleCreate} />
          <TaskList
            tasks={tasks}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}
