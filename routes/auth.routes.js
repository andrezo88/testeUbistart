const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        if (!name || !email || !password) {
            throw new Error("Todos os campos devem ser preenchidos.");
        }

        const user = await User.findOne({ email });

        if (user) {
            throw new Error("E-mail já cadastrado!")
        }

        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hash,
            roles
        });
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            roles: newUser.roles
        })

    } catch (error) {
        if (error.message === "E-mail já cadastrado!") {
            return res.status(400).json({ msg: error.message });
        }
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFromDb = await User.findOne({ email });

        if (!userFromDb) {
            const error = new Error("E-mail e/ou senha incorretas!");
            error.status = 400;
            throw error;
        }

        const compareHash = bcrypt.compareSync(password, userFromDb.password);

        if (!compareHash) {
            const error = new Error("E-mail e/ou senha incorretas!");
            error.status = 401;
            throw error
        }

        const payloadUser = {
            id: userFromDb._id,
            name: userFromDb.name,
            roles: userFromDb.roles,
            email
        }


        const token = jwt.sign(payloadUser, process.env.SECRET_JWT, {
            expiresIn: "1day",
        });

        res.status(200).json({ user: payloadUser, token });

    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message })
    }
});

module.exports = router;
