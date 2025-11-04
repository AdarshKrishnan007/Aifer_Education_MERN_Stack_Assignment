const express = require("express");
const auth = require("../middleware/authMiddleware");
const Task = require("../model/Task");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;
    const task = new Task({
      user: req.user.id,
      title,
      description,
      status: status || "pending",
      dueDate,
      priority,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = { user: req.user.id };
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: "i" };

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));
    const total = await Task.countDocuments(query);
    res.json({ tasks, total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const updates = req.body;
    Object.assign(task, updates);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
