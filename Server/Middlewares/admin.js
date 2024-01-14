const { AdminModel , CourseModel} = require('../Db/schema')
const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRETE = require('./JWT_SECRET')
const { response } = require('express')


// Remaining task : pending Email Verifcaition
async function  existAdminMiddleware(req ,res , next)
{
try
{
    const query = await AdminModel.findOne({username : req.body.username})
    if(query == null){next()}
    else 
    {
        return  res.status(401).json({
            msg : ":Admin Already Registerd"
        })
    }
    
}
catch(error)
{
            return  res.status(401).json({
                msg : ":Admin Already Registerd"
            })
        }
}

async function AdminMiddleware(req,res,next)
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
        let decodedToken = jsonwebtoken.verify(token , JWT_SECRETE);
        if (!decodedToken)
        {
            return  res.status(401).json({
                msg : "UnAuthorized Request"
            })
        }
        if (decodedToken.isAdmin == false){
            return  res.status(401).json({
                msg : "UnAuthorized Request"
            })
        }
        AdminModel.findOne({username : decodedToken.username}).then((response) => {
            if (response == null)
            {
                return  res.status(401).json({
                    msg : "UnAuthorized Request"
                })    
            }
        })
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

module.exports = {existAdminMiddleware , 
AdminMiddleware}