const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const Shop = mongoose.model("Shop")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }
        
        const {_id} = payload
        Shop.findById(_id).then(userdata=>{
            req.Shop = userdata
            if(userdata==null)
            {
                return res.status(401).json({error:"you must be logged in"})
            }
            else{
                next()
            }
            
        }).catch((err) => {
            console.log(err);
            return;
          });
        
        
    })
}