const express=require('express');

const User=mongoose.model('User', {
    userName: String,
    password: String
})

const router = express.Router();

module.exports=()=>{


    router.post(async(req,res,next)=>{

        try{
            const user = new UserModel({
                username: req.body.userName,
                password: req.body.password,

            })

            const savedUser= await user.save();
            if(savedUser) return res.redirect('/newPage')
            return next(new Error('Failed to save user'))

        } catch (err){
            return next(err)
        }

        
    })
}