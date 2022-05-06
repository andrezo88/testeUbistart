const { Router } = require("express");
const Todo = require("../models/Todo");
const User = require("../models/User");
const router = Router();
const ROLES_LIST = require("../config/role_list");
const verifyRoles = require("../middleware/verifyRoles")

router.get("/", verifyRoles(ROLES_LIST.Admin), async (req, res) => {
    const userId = req.user.id;
    try {
        const allTodos = await User.find().populate("todos").select("email")
        allTodos.forEach(todo => {
            const dateNow = new Date()
            dateNow.setHours(0, 0, 0, 0);
            todo.isLate = dateNow > todo.dueDate
        })
        res.status(200).json(allTodos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/", verifyRoles(ROLES_LIST.Admin), async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    try {
        const newTodo = await Todo.create({ ...req.body, user: userId });
        await User.findByIdAndUpdate(userId, { $push: { todos: newTodo._id } });
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;