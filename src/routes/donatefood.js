const express = require('express')
const router = express.Router()
const multer =  require('multer')
const Food = require('../model/food')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

router.post('/',upload.single('image'), async(req, res) => {
    console.log("e")
    try {
        var _city = String(req.body.city).toLowerCase()
        var newfood = new Food({
            items: req.body.items,
            food_type: req.body.food_type,
            posted_by: req.body.posted_by,
            max_people: req.body.max_people,
            phone:req.body.phone,
            address:req.body.address,
            city:_city,
            imageUrl: 'http://192.168.0.130:3030/images/' + req.file.originalname,
            expirationDate:new Date(Date.now() + (parseFloat(req.body.hour) * 3600 * 1000))
        })
        await newfood.save().then(()=>{
            console.log("POST /donatefood HTTP/1.1 201 created" + Date.now())
            res.status(201).json({result:"ok"})
        })
    }catch(err){
        console.log("POST /donatefood HTTP/1.1 500" + Date.now())
        console.error(err)
        res.status(500).json({})
    }
})

module.exports = router