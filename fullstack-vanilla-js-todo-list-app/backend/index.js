const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const PORT = 3000;

// Middleware
app.use(express.json()); // return the body of the request as a JSON object
app.use(cors());
app.use(bodyParser.json());

const todos = [
  {
    id: 1, 
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Learn JavaScript",
    completed: true,
  },
  {
    id: 3,
    title: "Learn Python",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo List API" });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id; // "if use this code, the req.parmas.id in below need to change to "+id"
  // const todo = todos.find((todo) => todo.id === req.params.id);
  const todo = todos.filter((todo) => todo.id == req.params.id);
  if (!todo) {
    res.send({ message: `Todo with id ${id} not found` });
  } else {
    res.json(todo);
  }
  // res.json({msg: "1 todo"})
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  todos.push({ id: uuid.v4(), ...req.body });
  res.json(todos)
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json(todos);
  } else {
    res.json({msg: "Not found the todo"})
  }

});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(index, 1);
  res.json(todos);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})