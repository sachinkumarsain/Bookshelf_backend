import mongoose from "mongoose";
const dashbord = new mongoose.Schema({
    username:{
        type :String,
        require:true
    },
    currentread:{
        type:Array
    },
    likebook:{
        type:Array
    },
    commentbook:{
        type:Array
    }

})

export default dashbord