import express from "express";
// import book from "./Model/Books.js";
import book from '../Model/Books.js'
import  authorize from "../Authorisation/UserAuto.js"
import dashbord from "../Model/dashbord.js";

const router = express.Router();
//-----------------------------------searchBook----------------------------------//

router.post('/searchbooks', async (req, res) => {
    // console.log(req.body.inputValue)
    const regEx = new RegExp(req.body.inputValue, "i")
    const result = await book.find(  { title: regEx });
    res.status(200).json(result)  
});


// ----------------------------------------product-------------------------------------//

router.get(`/product`, async (req, res) => {
    const totalBooks = await book.find();
    // console.log(totalBooks)
    if (totalBooks) {
        res.status(200).json(totalBooks) 
    }
    else {
        res.status(402).json("error")
    }
});   




//--------------------------list data--------------------------------//


router.post("/listdata" , async(req, res)=>{
    console.log(req.body)   

    let listValue = req.body.listValue;

    let data =  await book.find();
    let filterData = data.filter((value)=>{
         if(value.bookType===listValue){

            return value
        }
    })
    
      

    res.status(200).json(filterData) 

})

//.............................SearchBookOnClick...................//

// router.patch('/searchonclick/:session',authorize , async(req,res)=>{
    
//         let bookID = req.body.bookId
//     let username = await req.authUsername 
    
//     let filterBook = await dashbord.findOne({username}) 
//     let searchbooks = filterBook.searchbook

//     if(searchbooks.includes(bookID)){
//                 res.status(200).send("you already likes this book")
//             }
//             else{
//                 let liked = await dashbord.updateOne(
//                     {username},
//                     {$push:{searchbook:bookID}}
//                 )
        
//                 res.status(200).send("Successfully searchbooked  book")
        
//             }




//     res.status(200).json("hello")

// })
//....................Current Read Book..................//

router.patch('/currentread/:session',authorize , async(req,res)=>{
    
    let bookID = req.body.currentBookId
    // console.log(bookID)
let username = await req.authUsername 

// console.log(username) 
let filterBook = await dashbord.findOne({username}) 

// console.log(filterBook)
let currentRead = filterBook.currentread

if(currentRead.includes(bookID)){
            res.status(200).send("you already likes this book")
        }
        else{
            let CurrentRead = await dashbord.updateOne(
                {username},
                {$push:{currentread:bookID}}
            )
                // console.log(currentRead)
            res.status(200).send(200)
    
        }
  



res.status(200).json("hello")

})




//-----------------------------likedBook------------------------------------///

// router.patch(`/product/:session`,authorize,   async(req,res)=>{
//     let likeId = req.body.likeBookId
//     let username = await req.authUsername 
    
//     let filterBook = await dashbord.findOne({username}) 
//     let booksLiked = filterBook.likebook
    
//     console.log(likeId, username, booksLiked)
//     if(booksLiked.includes(likeId)){
//         res.status(200).send("you already likes this book")
//     }
//     else{
//         let liked = await dashbord.updateOne(
//             {username},
//             {$push:{likebook:likeId}}
//         )

//         // let totalLikedBook = await dashbord.likebook.find()

//         res.status(200).send("Successfully liked  book")

//     }
        
// })
//...............................CommentBook...............................//

router.patch("/commentbook/:session",authorize,async(req,res)=>{

    let commentBookId = req.body.commentBook;
    let inputValue = req.body.inputValue;

    console.log(commentBookId , inputValue)


        let username = await req.authUsername 
    
        let filterBook = await dashbord.findOne({username}) 
        let commentBookIds = filterBook.commentbook

        console.log(commentBookIds)

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
            
            res.status(200).send("Successfully comment  book")
        }

    

    
})

//........................set Rating book..........................//
// router.patch("/rating/:session", authentication, async (req, res) => {
//     let bookid = req.body.ratingBook;
//     let username = req.authUsername;
//     let rated = req.body.rating;
  
//     let filter = await dashbord.findOne({ username });
//     let ratingBooks = filter.ratingBooks;
  
//     //CHECKING BOOK ALREADY HAS GIVEN RATING
//     let checkingBooks = ratingBooks.filter((book) => {
//       let exist = false;
//       if (book.bookId === bookid) {
//         exist = true;
//       } else {
//         exist = false;
//       }
//       return exist;
//     });
  
  
//     if (checkingBooks.length === 0) {
//       await dashbord.updateOne(
//         { username },
//         { $push: { ratingBooks: { bookId: bookid, rating: rated } } }
//       );
   
//       res.send({status:200, message: "succesfuly rated books"})
  
//     } else {
   
//       res.send({status: 200, message: "You already gave rating to this book"}) 
//     }
//   });
  


export default router;