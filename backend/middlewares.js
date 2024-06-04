const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req,res,next) =>{

    const authHeaders = req.headers.authorization;

    if(!authHeaders){
        return res.status(403).json({
            msg:"forgot to send token"
        });
    }
    const token = authHeaders.split(" ")[1];
    try {
        const verifiedValue = jwt.verify(token,JWT_SECRET);
        if(verifiedValue.userId){
            req.userId = verifiedValue.userId;
            next();
        }else{
            return res.status(403).json({
                msg:"Not authenticated"
            });
        }
    } catch (error) {
        return res.status(403).json({
            msg:"Some exception is thrown"
        });

    }

}

module.exports = {
    authMiddleware
}


