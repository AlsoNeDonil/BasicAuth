const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

module.exports = function(roles){
    return function(req, res, next){
        if(req.method === 'OPTIONS'){
            next();
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(403).json({"mesasge": "User is not authorized(token is null)"});    
            }
    
            const userRole = jwt.verify(token, SECRET)['roles'];
            let hasRole = false;

            roles.forEach(role => {
                if(role === userRole){
                    hasRole = true;
                }
            })

            if(!hasRole){
                return res.status(403).json({"mesasge": "Access denied"});   
            }
            next();
    
        } catch(e){
            console.log(e);
            return res.status(403).json({"mesasge": "User is not authorized(some error)"});
        }
    }
}