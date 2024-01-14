const {  UserModel , CourseModel} = require('../Db/schema')
const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = require('./JWT_SECRET')

// Remaining task : pending Email Verifcaition
async function  existUserMiddleware(req ,res , next)
{   
try
{
    const query = await UserModel.findOne({username : req.body.username})
    if(query == null){next()}
    else 
    {
       return  res.status(401).json({
            msg : ":User Already Registerd"
        })
    }
    
}
catch(error)
        {
            return  res.status(401).json({
                msg : ":User Already Registerd"
            })
        }
}


async function userMiddleware(req,res,next)
{
    try{
        if (!req.headers.authorization)
        {
            return  res.status(401).json({
                msg : "UnAuthorized Request"
            })
        }
        let token = req.headers.authorization.split(' ')[1];
        if (!token)
        {
            return  res.status(401).json({
                msg : "UnAuthorized Request"
            })
        }
        let decodedToken = jsonwebtoken.verify(token ,JWT_SECRET );
        if (!decodedToken)
        {
            return  res.status(401).json({
                msg : "UnAuthorized Request"
            })
        }   
        req.username = decodedToken.username
        next()
    }
    catch(error)
    {
          return  res.status(401).json({
            msg : "UnAuthorized Request"
        })
    }
}

async function checkPurchasedCourse(req , res , next)
{
      try{
        console.log();
        let uid = await UserModel.findOne({username : req.username })
        if (uid.courses.includes(req.params.id))
        {
            return res.status(400).json({
                msg : "You already Purchaed that Course"
            })
        }
        else 
        {
            next();
        }
      }
      catch(error)
      {
        console.log(error);
        return res.status(500).json({
            msg : "Something Went Wrong"
        })
      }
}

module.exports = {existUserMiddleware , userMiddleware , checkPurchasedCourse}