const verifyRoles = (allowedRole) => {
    return (req, res, next) => {
        console.log(req.user.roles)
        const role = req.user.roles
        if (!role) return res.status(401).json("Não autorizado");
        if (role !== allowedRole)
            return res.status(401).json("Não autorizado")
        next()
    }
}

module.exports = verifyRoles;