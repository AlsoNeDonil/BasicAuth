const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");

module.exports = function(req, res, next){
    if(req.method === 'OPTIONS'){
        next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(403).json({"mesasge": "User is not authorized(token is null)"});    
        }

        const decodedData = jwt.verify(token, SECRET);
        req.user = decodedData;
        next();

    } catch(e){
        console.log(e);
        return res.status(403).json({"mesasge": "User is not authorized(some error)"});
    }
}