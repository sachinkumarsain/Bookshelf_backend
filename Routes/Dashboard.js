import express from "express"
import book from "../Model/Books"
import dashbord from "../Model/dashbord"
import authorize from "../Authorisation/UserAuto";


const router = express.Router();



router.get(`/likebooks/:session`, authorize ,async(req,res)=>{

console.log("hello")
console.log(req.body)

    res.status(200).send("data bejta hu")

})


export default router;
