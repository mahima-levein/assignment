const express = require("express");

const app = express();

app.use(express.json());

const tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = {
    id: tasks.length + 1,
    ...req.body
  };

  tasks.push(task);

  res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const [deleted] = tasks.splice(index, 1);
  res.json(deleted);
});

module.exports = app;