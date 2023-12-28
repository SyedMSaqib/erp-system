const jwt = require("jsonwebtoken");

const validator = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({"Error": "Empty token"});
    }

    try {
        const verifyToken = jwt.verify(token, "02192000");

        const currentTime = Math.floor(Date.now() / 1000);
        if (verifyToken.exp && verifyToken.exp < currentTime) {
            return res.status(400).json({"Error": "Token is expired"});
        }

        req.user = verifyToken.user;
        next();
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
};

module.exports = validator;
