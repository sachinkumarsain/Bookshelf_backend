import mongoose from "mongoose";
const dashbordSchema = new mongoose.Schema({
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
const dashbord = mongoose.model("dashbord",dashbordSchema)
export default dashbord