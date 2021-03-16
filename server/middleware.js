module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(500).send({ message: "You must be signed in!"})
    }
    next()
}