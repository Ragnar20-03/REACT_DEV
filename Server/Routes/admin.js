const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const {existAdminMiddleware  , AdminMiddleware}=  require('../Middlewares/admin')
const { AdminModel, CourseModel } = require('../Db/schema')
const JWT_SECRET = require("../Middlewares/JWT_SECRET")
const jsonwebtoken = require("jsonwebtoken")
const hashPassword = require('../Encryption/encrypt')

// OTP Verification pending
router.post('/register' ,existAdminMiddleware, async (req ,res)=>{
    const newPass = await hashPassword(req.body.password)
    AdminModel.create({
        username : req.body.username , 
        password : newPass
    }).then((response) => {
            let token = jsonwebtoken.sign({username : response.username , isAdmin : true} , JWT_SECRET)
            res.status(200).json({
                msg : "Registration Succefull !",
                token
            })
    })
})

// OTP Verification pending
router.post('/login' , async(req ,res)=>{
    AdminModel.findOne({username : req.body.username }).then( async(response) => {
        if (response == null)
        {
            res.status(400).json({
                msg : "Admin Account Not Found"
            })
        }
        else 
        {
            if ( ! await bcrypt.compare(req.body.password , response.password) )
            {
                res.status(401).json({
                    msg:"Password Not Matched !"
                })
            }
            else 
            {
                let token = jsonwebtoken.sign({username : response.username , isAdmin : true} , JWT_SECRET)
                res.status(200).json({
                    msg : "Admin Login Successfull",
                    token
                })
            }
        }
    })
})


// OTP Verification pending
router.post('/addCourse',AdminMiddleware , (req ,res)=>{
    CourseModel.create({
        name : req.body.courseName , 
        price : req.body.coursePrice , 
        description : req.body.courseDescription,
        duration : req.body.courseDuration
    }).then( async(response) => {
        let query = await AdminModel.updateOne({username : req.username} , {$push : {
            courses : response._id
        }} );
       if(query.acknowledged)
        {
            res.status(200).json({
                msg : "Course Added Succesfully"
            })
        }
        else 
        {
            res.status(500).json({
                msg : "Failed To Add Course!"
            }) 
        }
    }).catch((error) => {
        res.status(500).json({
            msg : "Somthing went wrong !"
        })
    })
})

router.get('/course',AdminMiddleware , async(req ,res)=>{
try{
    let aid = await AdminModel.findOne({username : req.username});
    let cid = aid.courses
    let courses = await CourseModel.find({
        _id : {
            $in : cid
        }
    })
    if (courses.length > 0 ){
    res.status(200).json({
        courses 
    })}
    else 
    {
        res.status(400).json({
            msg : "No Courses Added"
        })
    }
}
catch(error)
{
    res.status(500).json({
        msg : "Something Went Wrong !"
    })  
}
})


router.get('/course/:id' , AdminMiddleware ,async (req ,res)=>{
    let aid = await AdminModel.findOne({username : req.username})
    let cid = aid.courses
    if (cid.includes(req.params.id)){
        CourseModel.findOne({_id : req.params.id}).then((response) => {
            res.status(200).json({
                course : response
            })
        })
    }
    else 
    {
        res.status(200).json({
            msg : "No Courses Found"
        })    
    }
})

router.post('/update/:id',AdminMiddleware , async(req ,res) => {
    let newDoc = await CourseModel.findByIdAndUpdate({_id : req.params.id} ,req.body , {
        new : true ,
    } )
    res.status(200).json({newDoc})
})


module.exports = router