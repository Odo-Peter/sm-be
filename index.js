require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./connectdb');

const Todo = require('./models/Todo');

app.use(cors());
app.use(express.json());

app.get('/todo', async (req, res) => {
  const todos = await Todo.find({});

  res.json(todos);
});

app.get('/todo/:id', async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  res.json(todo);
});

app.post('/todo', async (req, res) => {
  const { name, checked } = req.body;

  const newTodo = new Todo({
    name,
    checked: checked || false,
  });

  const savedTodo = await newTodo.save();

  res.status(201).json(savedTodo);
});

app.put('/todo/:id', async (req, res) => {
  const { name, checked } = req.body;
  const { id } = req.params;

  const newTodo = {
    name,
    checked,
  };

  const updatedTodoObj = await Todo.findByIdAndUpdate(id, newTodo, {
    new: true,
  });

  res.json(updatedTodoObj);
});

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({ message: 'Not found' });
  }

  await Todo.findByIdAndDelete(id);
  res.status(204).end();
});

const PORT = 3003;
connectDB();

app.listen(PORT, console.log(`server running at ${PORT}`));
