// Authorize.js
import jwt from "jsonwebtoken";
import user from "../Model/user.js";
import { config } from "dotenv";

config();
const jwtKey = process.env.SECRET_KEY;

 function authorize(req, res, next) {
    const sessionId = req.body.session ;

    if(!sessionId){
        res.status(200).send("Failed author")
    }
    try{
        console.log("reached here");
        const decodeToken = jwt.verify(sessionId, jwtKey);
        const userName = decodeToken.userName;

        if(userName){
            req.authUsername = userName;
            next();
        }else{
    
            res.status(300).send("failed author")
        }

    }
    catch(err){
        console.log(err);
        res.status(300).send("failed author")
    }
  
}

export default authorize;
