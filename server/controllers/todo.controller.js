const Todo = require("../models/Todo.model");

module.exports.todoControllers = {
  todoGet: async (req, res) => {
    const { userId } = req.params;
    try {
      let data = await Todo.findOne({
        userId: userId,
      });

      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  todoCreate: async (req, res) => {
    const { title, text } = req.body;
    const { userId } = req.params;
    try {
      const todos = await Todo.findOne({ userId });
      const data = await Todo.findByIdAndUpdate(
        todos._id,
        {
          $push: {
            todos: {
              title: title,
              text: text,
            },
          },
        },
        { new: true }
      );

      res.json(data.todos);
    } catch (error) {
      res.json(error);
    }
  },
  todoRemove: async (req, res) => {
    const { todo } = req.body;
    const { userId } = req.params;
    try {
      const setTodos = await Todo.findOne({ userId: userId });
      const todoItem = setTodos.todos.filter((item) => item.id !== todo);

      const data = await Todo.findByIdAndUpdate(
        setTodos._id,
        {
          todos: todoItem,
        },
        { new: true }
      );

      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  todoToggleCompleted: async (req, res) => {
    const { id } = req.body;
    const { userId } = req.params;
    try {
      const setTodos = await Todo.findOne({ userId: userId });
      const todoItem = setTodos.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

      const data = await Todo.findByIdAndUpdate(
        setTodos._id,
        {
          todos: todoItem,
        },
        { new: true }
      );

      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  todoTextEdit: async (req, res) => {
    const { id, title, text } = req.body;
    const { userId } = req.params;
    try {
      const setTodos = await Todo.findOne({ userId: userId });
      const todoItem = setTodos.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
          todo.text = text;
        }
        return todo;
      });

      const data = await Todo.findByIdAndUpdate(
        setTodos._id,
        {
          todos: todoItem,
        },
        { new: true }
      );

      res.json(data)
    } catch (error) {
      res.json(e.message);
    }
  },
};
