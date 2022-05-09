require("dotenv").config();
var express = require('express');
const connectDb = require("./config/db.config");
const ROLE_LIST = require("./config/role_list");
const createAdminUser = require("./seed/admSeeder")


var app = express();

//Db conection
connectDb().then(() => {
    createAdminUser();
});


app.use(express.json())

//Public Routes

app.use("/auth", require("./routes/auth.routes"));
app.use("/login", require("./routes/auth.routes"));

//Middleware
app.use(require("./middleware/auth.middleware"));

//Private Routes

//app.use("/user", require("./routes/user.routes"));
app.use("/todos", require("./routes/todo.routes"));

//adm middleware
app.use(require("./middleware/verifyRoles")(ROLE_LIST.Admin))

//ADM private Routes
app.use("/adm", require("./routes/adm.routes"))

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));