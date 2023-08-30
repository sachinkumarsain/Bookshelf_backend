import express from "express";
// import book from "./Model/Books.js";
import book from '../Model/Books.js'
import authorize from "../Authorisation/UserAuto.js";
import dashbord from "../Model/dashbord.js";

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
    if (totalBooks) {
        res.status(200).json(totalBooks) 
    }
    else {
        res.status(402).json("error")
    }
});


//-----------------------------likedBook------------------------------------///

router.patch('/product',authorize,   async(req,res)=>{
    let likeId = req.body.likeBookId
    let username = await req.authUsername 
    
    let filterBook = await dashbord.findOne({username}) 
    let booksLiked = filterBook.likebook
    
    console.log(likeId, username, booksLiked)
    if(booksLiked.includes(likeId)){
        res.status(200).send("you already likes this book")
    }
    else{
        let liked = await dashbord.updateOne(
            {username},
            {$push:{likebook:likeId}}
        )

        // let totalLikedBook = await dashbord.likebook.find()

        res.status(200).send("Successfully liked  book")

    }
      
})
//...............................CommentBook...............................//

router.patch("/singleshowbook",authorize,async(req,res)=>{
    let commentBookId = req.body.commentBook;
    let inputValue = req.body.inputValue;

        let username = await req.authUsername 
    
        let filterBook = await dashbord.findOne({username}) 
        let commentBookIds = filterBook.commentbook

        if(commentBookIds.includes(commentBookId))
        {
            res.status(200).send("already commented")
        }
        else{
            let commented = await dashbord.updateOne(
                {username},
                {$push:{commentbook:{
                    id:commentBookId,
                    comment:inputValue
                }}}

            )
            
            res.status(200).send("Successfully liked  book")
        }

    

    
})


export default router;