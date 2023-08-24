import express from "express";
// import book from "./Model/Books.js";
import book from '../Model/Books.js'
import authorize from "../Authorisation/UserAuto.js";





const router = express.Router();
//-----------------------------------searchBook----------------------------------//

router.get('/searchbooks', async (req, res) => {
    const regEx = new RegExp(req.body.inputValue, "i")
    const result = await book.find({ title: regEx });
    res.status(200).json(result)
});


// ----------------------------------------product-------------------------------------//

router.get('/product', async (req, res) => {
    const totalBooks = await book.find();
    // console.log(totalBooks)
    if (totalBooks)   {
        res.status(200).json(totalBooks)
    }
    else {
        res.status(402).json("error")
    }
});


//-----------------------------likedBook------------------------------------///
router.patch('/product',authorize,  async(req,res)=>{
    let LikeBooks = req.body.likeBookId
    let username = req.username
    console.log(LikeBooks, username)
  res.status(200).send("everything is fine")

})

export default router;