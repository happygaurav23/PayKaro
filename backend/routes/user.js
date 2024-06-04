const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const zod = require('zod');
const { userModel, accountModel } = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middlewares');

const signUpSchema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

router.post("/signup",async (req,res) => {
    const {success} = signUpSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Invalid Inputs"
        })
    }

    const existingUser = await userModel.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg:"User already existed"
        })
    }

    let {username,password,firstName,lastName} = req.body;

    

    bcrypt.hash(password, 10, async function(err, hashedPassword) {
        // Store hash in your password DB.

        if(!err){
            password = hashedPassword;
            const newUser = await userModel.create({
                username:username,
                password:password,
                firstName:firstName,
                lastName:lastName

            })

            const userId = newUser._id;
            const userFirstName = newUser.firstName;
            console.log(userId);
            await accountModel.create({
              userId,
              userFirstName,
              balance:1 + Math.random() * 100000

            })

            const token = jwt.sign({
                userId:userId
            },JWT_SECRET);

            res.json({
                msg:"User Created Successfully",
                token:token,
            })

        }else{
            res.status(500).json({
                msg:"Some problem occured"
            })
        }
    });

   


    // const newUser = await userModel.create({
    //     username:req.body.username,
    //     password:req.body.password,
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName
    // });


    //creating account while user signup and assign them some balance
    // const userId = newUser._id;
    // await accountModel.create({
    //     userId,
    //     balance:1 + Math.random() * 100000

    // })

    // const token = jwt.sign({
    //     userId:userId
    // },JWT_SECRET);

    // res.json({
    //     msg:"User Created Successfully",
    //     token:token,
    // })
})


const signInSchema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
})


router.post("/signin",async (req,res)=>{

    const {success} = signInSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Invalid Inputs"
        })
    }


    const {username,password} = req.body;

    const user = await userModel.findOne({
        username:req.body.username,
        //password:req.body.password
    })

    console.log(user);

    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result === true){
                const token = jwt.sign({
                    userId:user._id
                },JWT_SECRET)
        
                return res.status(200).json({
                    token:token
                })
                
            }else{
                return res.status(500).json({
                    msg:"Incorrect password/details"
                })
            }

        })
        // const token = jwt.sign({
        //     userId:user._id
        // },JWT_SECRET)

        // res.status(200).json({
        //     token:token
        // })
    }else{
        return res.status(411).json({
            msg:"Error while signin"
        })

    }

    

})


const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware,async (req,res)=>{

    //remember to decrypt the password first then update the details

    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Invalid Inputs"
        })
    }

    const updatedData = await userModel.findOneAndUpdate({
        _id:req.userId
    },req.body);

    if(updatedData){
        res.json({
            msg:"User Details Updated Successfully"
        })
    }else{
        res.status(411).json({
            msg:"Error while updating data"
        })
    }

})

router.get("/users" , async (req,res)=>{
    const filter = req.query.filter || "";
    const allUsers = await userModel.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user: allUsers.map(user =>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})






module.exports = router;