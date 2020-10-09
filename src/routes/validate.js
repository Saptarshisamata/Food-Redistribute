const jwt = require("jsonwebtoken")
const User = require('../model/member')
const express= require('express')
const router  =  express.Router()
router.use((req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,"abcd",(err,payload)=>{
        if(err){
        return res.status(401).json({error:"you must be logged in"})
            
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
        })
        next()
    })
})
module.exports = router