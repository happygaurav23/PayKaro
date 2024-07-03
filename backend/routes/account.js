const express = require('express');
const { authMiddleware } = require('../middlewares');
const { accountModel } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();



router.get("/balance",authMiddleware,async(req,res)=>{

    const account = await accountModel.findOne({
        userId:req.userId
    })

    res.json({
        balance:account.balance,
        user:account.userFirstName
    })
})


router.post("/transfer",authMiddleware,async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
    
        const receiver = req.body.to;
        const amount = req.body.amount;
     
        //now fetch the account within the transactions
        const senderAccount = await accountModel.findOne({
            userId:req.userId
        }).session(session);
    
        if(!senderAccount || senderAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Insufficient baance or account does not existed"
            })
        }
    
        const receiverAccount = await accountModel.findOne({
            userId:receiver
        }).session(session);

        //console.log(receiver);
    
        if(!receiverAccount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Account does not existed"
            })
        }
    
        //now perform the transactions
        await accountModel.updateOne({
            userId:req.userId
        },{
            $inc:{
                balance: -amount
            }
    
        }).session(session);
    
        await accountModel.updateOne({
            userId:receiver
        },{
            $inc:{
                balance: amount
            }
    
        }).session(session);
    
        //now commit the transaction
        await session.commitTransaction();
        res.json({
            msg:`${amount} Transfered successfully`
        })
        
    } catch (error) {
        session.abortTransaction();
        res.status(400).json({
            msg:"Some error occured" + error
        })
        
    }


   
})


module.exports = router;