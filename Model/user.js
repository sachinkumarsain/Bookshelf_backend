import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    
    }

    
})
const user = mongoose.model("User",userSchema);
// userSchema.pre('save', function (next) {
//     const admin = this;
//     if (!admin.isModified('password')) {
//         return next();
//     }

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next(err);
//         }

//         bcrypt.hash(admin.password, salt, (err, hash) => {
//             if (err) {
//                 return next(err);
//             }
//             admin.password = hash;
//             next();
//         })
//     })

// })
// userSchema.methods.comparepassward = function (candidatepassword,callbacks){
//     bcypted.comapre(candidatepassword,this.password,(err, ismatch) =>{
//         if(err){
//             return callbacks(e   rr);
//         }
//         callbacks(null,ismatch)
//     })
// }
export default user;