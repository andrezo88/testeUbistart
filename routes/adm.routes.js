const { Router } = require("express");
const Todo = require("../models/Todo");
const User = require("../models/User");
const router = Router();
const ROLES_LIST = require("../config/role_list");
const verifyRoles = require("../middleware/verifyRoles")

router.get("/", verifyRoles(ROLES_LIST.Admin), async (req, res) => {

    let { pg, limit, isLate } = req.query
    if (!pg)
        pg = 1
    if (!limit)
        limit = 10
    const skip = (pg - 1) * limit;
    try {

        const allTodos = await Todo.find().skip(skip).limit(limit).populate("user", { email: 1 }).select(" title dueDate ").lean()
        allTodos.forEach(todo => {
            const dateNow = new Date()
            dateNow.setHours(0, 0, 0, 0);
            todo.isLate = dateNow > todo.dueDate
        })
        if (isLate) {
            const filteredTodos = allTodos.filter(todo => {
                return todo.isLate
            })
            return res.status(200).json(filteredTodos)
        }
        res.status(200).json(allTodos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;