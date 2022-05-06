const { Router } = require("express");
const Todo = require("../models/Todo");
const User = require("../models/User");
const router = Router();

router.get("/", async (req, res) => {
    const userId = req.user.id;
    try {
        const userFromDb = await User.findById(userId).populate("todos");
        const allTodos = userFromDb.todos;
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

router.post("/", async (req, res) => {
    const userId = req.user.id;
    try {
        const newTodo = await Todo.create({ ...req.body, user: userId });
        await User.findByIdAndUpdate(userId, { $push: { todos: newTodo._id } });
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const updateTodo = await Todo.findByIdAndUpdate({ _id: id, user: userId }, req.body, {
            new: true
        });
        if (!updateTodo) {
            throw new Error("Não é possível atualizar item de outro usuário.")
        }
        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deleteTodo = await Todo.findByIdAndDelete(id);
        if (deleteTodo.user.toString() !== userId) {
            throw new Error("Não é possível deletar item de outro usuário.")
        }

        res.status(200).json(deleteTodo)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;