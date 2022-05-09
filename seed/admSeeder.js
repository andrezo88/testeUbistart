const User = require("../models/User")

const mongoose = require("mongoose")

const createAdminUser = () => {

    const admin = new User({
        name: "admin",
        email: "admin@example.com",
        password: "admin123",
        roles: 5150
    })
    admin.save().catch((error) => {
        console.log(error.message)
    });



}

module.exports = createAdminUser