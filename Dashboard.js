  import express, { Router } from "express";
  import dashboard from "./Model/dashbord.js"
  import user from "./Model/user.js"
  import userAuto from "./Authorisation/UserAuto.js";
  import book from "./model/Books.js"

  const router = express.Router();

  router.get("/dashboard/:session", userAuto, async (req, res) => {

    let username = req.authUsername;
    const userdata = await dashboard.findOne({ username });
    
    console.log(userdata)
    // userdata: userdata  
    res.send({status:200, message: "got dashboardData", userdata: userdata }) 
  });
 
