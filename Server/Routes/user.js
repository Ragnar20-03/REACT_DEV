const express = require('express')
const router = express.Router()
const { existUserMiddleware ,  userMiddleware , checkPurchasedCourse} = require('../Middlewares/user')
const {UserModel , CourseModel } = require("../Db/schema") 
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = require("../Middlewares/JWT_SECRET")
const hashPassword = require("../Encryption/encrypt")
const bcrypt = require('bcrypt')


router.get('/' , (req ,res)=>{
    res.send("Hello From main user")
})

router.post('/register',existUserMiddleware , async(req ,res)=>{
        let newPass = await  hashPassword(req.body.password)
        UserModel.create({
        username : req.body.username , 
        password : newPass
    }).then((response) => {
        let token  = jsonwebtoken.sign({username : response.username , isAdmin : false} , JWT_SECRET)
        res.status(200).json({
            msg : "User Registration Succesfull !",
            token : token
        })
    }).catch(error => res.status(500).json({msg : "Something Went Wrong"}))

})

router.post('/login' , async(req ,res)=>{
    UserModel.findOne({username : req.body.username}).then(async(response) => {
        if (response == null)
        {
           return  res.status(400).json({
                msg : "User Account Not Found ! Please Regsiter"
            })
        }
        else 
        {
            if (!await bcrypt.compare(req.body.password , response.password))
            {
                return  res.status(400).json({
                    msg : "Password Not mathced !"
                })
            }
            else 
            {       
                let token = jsonwebtoken.sign({username : response.username  , isAdmin : false} , JWT_SECRET )
                res.status(200).json({
                    msg : "User Login Succesfull !",
                    token : token
                })
            }

        }
    })
})

router.post('/purchaseCourse/:id', userMiddleware ,checkPurchasedCourse ,async(req ,res)=>{
    CourseModel.findOne({_id : req.params.id}).then( async (response) => {
        console.log(response);
        let query = await UserModel.updateOne({username : req.username} , {$push : {
            courses : response._id
        }})
        if (query.acknowledged)
        {
            res.status(200).json({
                msg:"Course Purchased Succesfully !"
            })
        }
        else 
        {
            res.status(500).json({
                msg:"Failed to Purchase Course  !"
            })
        }
    }).catch((error) => {
        res.status(500).json({
            msg : "Something Went Wrong"
        })
    })
})

router.get('/purchasedCourse' , userMiddleware, async(req ,res)=>{
    try
    {
        let aid  = await UserModel.findOne({username : req.username} );
        let courses = await CourseModel.find({
            _id : {
                $in : aid.courses
            }
        })
        if (courses.length > 0 )
        {
            res.status(200).json({
                courses 
            })
        }
        else 
        {
            res.status(200).json({
                msg : "You havent purchased any course yet" 
            })
        }
    }
    catch(error)
    {

        res.status(200).json({
            msg : "You havent purchased any course yet" 
        })
    }
})



router.get('/course/:id' , async(req ,res)=>{
    CourseModel.findOne({_id : req.params.id}).then((response) => {
        res.status(200).json({
            course : response
        })
    }).catch((error) =>{
        res.status(200).json({
            msg : "Something Went Wrong"
        })
    })
})

router.get('/course' , async(req ,res)=>{
    CourseModel.find({}).then((response) => {
        res.status(200).json({
            course : response
        })
    }).catch((error) =>{
        res.status(200).json({
            msg : "Something Went Wrong"
        })
    })
})


module.exports = router