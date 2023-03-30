const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo.model");

module.exports.usersController = {
  registration: async (req, res) => {
    const { username, password } = req.body;
    try {
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(401).json("Данный username уже занят!");
      }

      const hash = await bcrypt.hash(password, 8);
      const user = await User.create({
        username: username,
        password: hash,
      });

      const todo = await Todo.create({
        userId: user._id,
      });

      await Todo.findByIdAndUpdate(todo._id, {
        $push: {
          todos: [
            {
              title: "Заголовок-1",
              text: "Текст-1",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: "Заголовок-2",
              text: "Текст-2",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: "Заголовок-3",
              text: "Текст-3",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: "Заголовок-4",
              text: "Текст-4",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: "Заголовок-5",
              text: "Текст-5",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      });

      res.json({
        message: "Регистрация прошла успешно!",
        user: user,
      });
    } catch (error) {
      res.json(error);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const candidate = await User.findOne({ username });

      if (!candidate) {
        return res.status(401).json("Такого пользователь не существует!");
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json("Неверный логин или пароль!");
      }

      const payload = {
        id: candidate._id,
        username: candidate.username,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        token: token,
        userId: candidate._id,
        username: candidate.username,
        message: "Вы вошли в систему!",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
