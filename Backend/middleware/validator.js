var jwt = require("jsonwebtoken");



const validator = (req, res, next) => {
    const token=req.header("auth-token")
    const verifyToken=jwt.verify(token, "02192000");
    if(!verifyToken)
    return req.status(401).json({"Error":"Empty token"})
    try {
        req.user=verifyToken.user;
        next()
    } catch (error) {
        res.status(401).send("Invalid Token")
        
    }
};
module.exports=validator;
