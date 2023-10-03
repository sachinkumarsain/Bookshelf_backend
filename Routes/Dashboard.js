import express from "express"
import book from "../Model/Books.js"
import dashbord from "../Model/dashbord.js"
import authorize from "../Authorisation/UserAuto.js";


const router = express.Router();

//gfhcfccgcyfcfyfg

//.................Dashbook-Like-books.................//

router.get(`/likebooks/:session`, authorize ,async(req,res)=>{

    let username = await req.authUsername 



    let filterUser = await dashbord.findOne({username})
    let likeBookedIds = filterUser.likebook.slice(1)


    const collectData = await Promise.all(likeBookedIds.map(async (_id) => {
        return await book.findOne({ _id });
      }));

    console.log(collectData)       

    
    res.status(200).send(collectData)
    // res.status(200).send(username)


})

//.................dashboard-comment-books............//
export default router;
