
import express from "express"
// import user from "./Model/user.js";
import user from '../Model/user.js'
import  Jwt  from "jsonwebtoken";
import { config } from "dotenv"; 
import dashbord from "../Model/dashbord.js" 
import bcrypt from  'bcrypt'


config();
const jwtKey = process.env.SECRET_KEY;
const router = express.Router()
// import authorize from "../Authorization/Authorization.js";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "http://localhost:3000" }))


// app.get("/", (req, res) => {
//     // res.send("hello world")

// })


router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    // const username = req.body.userName
    // const userData = await user.findOne({ username });
    // res.status(200).json(userData);
    const userTryingToLogin = await user.findOne({ username })
    if (user) {

        if (userTryingToLogin && bcrypt.compareSync(password, userTryingToLogin.password)) {

            const token = Jwt.sign({ userName: username }, jwtKey);
            console.log(token)
            const SavedToken = ("key", token)  
           
            console.log("hi")
            res.status(200).send(SavedToken); 
            // console.log("mja aa gya")
        }
        else {
            res.status(400).send("invalid credentials")
        }
    }
    else {
        res.status(400).send("invalid credentials")
    }
})

router.post("/register", async (req, res) => {
    const { name, email, phone, username, password } = req.body;

    // const salt = await bcrypt.genSalt(10)

    const hashedpassword = await bcrypt.hash(password , 10) ;
    // console.log(hashedpassword)
    const newUser = new user({
        name,
        email,
        phone,
        username,
        password:hashedpassword,
    })

    await newUser.save();
    const newDashboard = new dashbord({
        username: username,
        currentread: 0,
        likebook: 0,
        commentbook: 0,

    })

    await newDashboard.save();
    console.log("hi")
    res.status(200).send("well come")

})

export default router               