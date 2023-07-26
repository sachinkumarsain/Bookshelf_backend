import cors from "cors"
import express from "express"
import connection from "./db/Connections.js";
import user from "./Model/user.js";
import book from "./Model/Books.js"
// import bcrypt from "bcrypt"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => { 
    // res.send("hello world")
    
})
app.post("/login", async (req ,res)=>{
    const{username ,password}=req.body;

    const userTryingToLogin =await user.findOne({username})
    if(user){      
         
        if(password===userTryingToLogin.password){
            res.status(200).send("success")
            console.log("mja aa gya") 
        }
        else{
            res.status(401).send("invalid credentials")
        } 
    }
    else{
        res.status(402).send("invalid credentials")
    }
})

app.post("/register", async (req, res) => {
    const { name, email, phone, username, password } = req.body;
    // const hashedpassword = await bcrypt.hash(password , 10) ;
    const newUser = new user({
        name,
        email,
        phone,
        username,
        password,
    })
    
    await newUser.save();
    console.log("hi")
    res.status(200).end("well come")

})



// app.post("/cart", async (req, res) => {
//   const { bookData } = req.body;

//   if(bookData){
//     for (let bookdata of bookData) {
        // if (
        //   bookdata.volumeInfo.title ||
        //   bookdata.volumeInfo?.authors[0] ||
        //   bookdata.volumeInfo.imageLinks?.thumbnail ||
        //   bookdata.saleInfo.country
        // ) {
        //   let title =
        //     bookdata.volumeInfo.title.length > 25
        //       ? bookdata.volumeInfo.title.slice(0, 25)
        //       : bookdata.volumeInfo.title;
        //   let author =
        //     bookdata.volumeInfo.authors[0].length > 20
        //       ? bookdata.volumeInfo.authors[0].slice(0, 20)
        //       : bookdata.volumeInfo.authors[0];
        //   let image = bookdata.volumeInfo.imageLinks?.thumbnail
        //     ? bookdata.volumeInfo.imageLinks.thumbnail
        //     : books[6].volumeInfo.imageLinks.thumbnail;
        //   let description =  ( bookdata.volumeInfo.description.length > 300)
        //   ?  bookdata.volumeInfo.description.slice(0, 300) : bookdata.volumeInfo.description;
        //   let bookType = "romance";
        //   let country = bookdata.saleInfo.country;
        
      console.log(bookdata)
          // const newBooks = new book({
          //   title:bookData.title,
          //   author:bookData.author,
          //   image:bookData.image,
          //   description : bookData.description,
          //   bookType : "romance",
          // });

    
          // await newBooks.save();  
          // console.log("ho gya"); 
          
//         }  
      
//       res.status(200).send("books available");
//   } else {
//     res.status(350).send("please solve this error");
//   } 
 
// });                         


connection.then(() => {
    app.listen(8080, () => { console.log("server started at port 8080") })
}) 

                                    
//hfjwfkjbkfb
//kejbfkjdbfhbdshjfbhjdwbfihjdbfhbfsdjhfihr