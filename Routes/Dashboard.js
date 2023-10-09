import express from "express"
import book from "../Model/Books.js"
import dashbord from "../Model/dashbord.js"
import authorize from "../Authorisation/UserAuto.js";


const router = express.Router();

//gfhcfccgcyfcfyfg

//.................Dashbook-Like-books.................//

router.get(`/likebooks/:session`, authorize, async (req, res) => {

  let username = await req.authUsername



  let filterUser = await dashbord.findOne({ username })
  let likeBookedIds = filterUser.likebook.slice(1)


  const collectData = await Promise.all(likeBookedIds.map(async (_id) => {
    return await book.findOne({ _id });
  }));

  console.log(collectData)


  res.status(200).send(collectData)
  // res.status(200).send(username)


})
//.................search Books......................//

router.get(`/searchbooks/:session`, authorize, async (req, res) => {

  let username = await req.authUsername



  let filterUser = await dashbord.findOne({ username })
  let searchBookedIds = filterUser.searchbook.slice(1)


  const collectData = await Promise.all(searchBookedIds.map(async (_id) => {
    return await book.findOne({ _id });
  }));

  console.log(collectData)

  res.status(200).send(collectData)
  // res.status(200).send(username)


})
//.................Current Read Books ...............//\

router.get(`/currentreadbooks/:session`, authorize, async (req, res) => {

  let username = await req.authUsername


  let filterUser = await dashbord.findOne({ username })
  let currentReadIds = filterUser.currentread.slice(1)

  console.log(currentReadIds)

  const collectData = await Promise.all(currentReadIds.map(async (_id) => {
    return await book.findOne({ _id });
  }));

  // console.log(collectData)


  res.status(200).send(collectData)

})
//.................dashboard-comment-books............//

router.get(`/commentbooks/:session`, authorize, async (req, res) => {

    let username = req.authUsername;  
  
    const filterUser = await dashbord.findOne({username})
    let commentedBooks = filterUser.commentbook.slice(1)
  
    // taking all ids 
    let temp =  commentedBooks.map((books) =>{
      return books.id
   }) 
   

   let comment = commentedBooks.map((book) =>{
    return book.comment
  }) 
  
  const collectedData = await Promise.all(temp.map(async(_id) =>{ 
    return await book.findOne({_id});
  }));
  
  const collectData = collectedData.map((bookData, i) => {
    return {
      ...bookData.toObject(), 
      comment: comment[i], 
    };
  }); 
   
  
    // console.log(temp,  collectData) 
    res.send({status:200, message: "got all commented BookData", collectdata:collectData}) 
  

})

//.......................rating books ..........................//

router.get('/getAllRatedBooks/:session', authorize, async(req, res) =>{
  let username = req.authUsername;
  const filterUser = await dashbord.findOne({username}); 
  let ratingBookIds = filterUser.ratingbook.slice(1)
 
  // taking all ids
  let temp =  ratingBookIds.map((books) =>{
              return books.bookId
    }) 


  // take all rating  
  let rate = ratingBookIds.map((book) =>{
       return book.rating
  })  
    

  // all books rating data
  const collectedData = await Promise.all(temp.map(async(_id) =>{ 
    return await book.findOne({_id});
  }));

 // merging rating with data
  const modifiedData = collectedData.map((bookData, i) => {
    return {
      ...bookData.toObject(), // Convert Mongoose document to plain object
      rating: rate[i], // Assign the corresponding rating
    };
  });


  const collectData = modifiedData;
  console.log(collectData);
    
  res.send({status:200, message: "got all rated bookData", collectData: collectData}) 
})


export default router;
