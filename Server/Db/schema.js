const mongoose  = require('mongoose');
const MONGO_URL = require("./config")
mongoose.connect(MONGO_URL)
const userSceham = new mongoose.Schema({
    username : String , 
    password : String,
    email : String , 
    phone : String,
    courses : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref  : "Courses"
    }]
})
const adminSchema = new mongoose.Schema({
    username : String , 
    password : String , 
    email : String , 
    phone : String,
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "Courses"
        }
    ]
})

const courseSchema  = new mongoose.Schema({
    name : String , 
    description : String , 
    price : String , 
    duration : String
})

const AdminModel = mongoose.model  ('admin' , adminSchema)
const UserModel = mongoose.model  ('users' , userSceham)
const CourseModel = mongoose.model  ('courses' , courseSchema)

module.exports  = { 
    AdminModel , UserModel , CourseModel
}