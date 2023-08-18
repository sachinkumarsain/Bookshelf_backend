import cors from "cors"
import express from "express"
import connection from "./db/Connections.js";
import user from "./Model/user.js";
import book from "./Model/Books.js"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
// import bcrypt from "bcrypt"

config()
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));



app.get("/", (req, res) => {
    // res.send("hello world")

})
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const userTryingToLogin = await user.findOne({ username })
    if (user) {

        if (password === userTryingToLogin.password) {
          
            console.log("mja aa gya")

            const jwtKey = process.env.SECRET_KEY;
            const token = jwt.sign({userName:username}, jwtKey); 
            console.log(token)
            res.cookie("token",token,{httpOnly:true,maxAge:400000})
            
            res.status(200).send();
        }

        else {
            res.status(401).send("invalid credentials")
        }
    }

    else {
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
    res.status(200).send("well come")

})

app.post("/cart", async (req, res) => {
    const { aaya } = req.body;

    if (aaya) {
        for (let bookdata of aaya) {
            console.log(bookdata)
            const newBooks = new book({
                title: bookdata.title,
                author: bookdata.author,
                image: bookdata.image,
                description: bookdata.description,
                bookType: "flower",
                publishedDate: bookdata.publishedDate,
                publisher: bookdata.publisher

            });

            await newBooks.save();
            console.log("ho gya");
        }

        res.status(200).send("books available");
    }
    //else {
    //     res.status(350).send("please solve this error");
});

app.post("/searchbooks", async (req, res) => {
    const regEx = new RegExp(req.body.inputValue, "i")
    const result = await book.find({ title: regEx });
    res.status(200).json(result)

})
app.get("/product", async (req, res) => {
    const totalBooks = await book.find();
    if (totalBooks) {
        res.status(200).json(totalBooks)
    }
    else {
        res.status(402).json("error")
    }
})


connection.then(() => {
    app.listen(8080, () => { console.log("server started at port 8080") })
})


//hfjwfkjbkfb
//kejbfkjdbfhbdshjfbhjdwbfihjdbfhbfsdjhfihr