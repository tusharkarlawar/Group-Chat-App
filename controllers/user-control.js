const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const sequelize = require("../util/database");
require('dotenv').config();

exports.addUser = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const name = req.body.name;
        const email = req.body.email;
        const checkemail = req.body.email;
        const password = req.body.password;
        let totalExpense = 0;
        if(password.length<5){
            return(res.json({msg:"password should atleast contain 5 letters",
        success: false}));
        }
        bcrypt.hash(password, 5, async(error, hash)=>{
            if(error){
                return res.json({msg:"Encryption error", success:false});
            }else{
                const found = await user.findAll({
                    where:{
                        email: checkemail
                    }
                })
                if(found.length != 0){
                    res.json({msg:"User Already exists!! Please enter a different email", success:false});
                }else{
                    const data = await user.create({
                    name:name,
                    email:email,
                    password:hash,
                    totalExpense:totalExpense
                },{
                    transaction: transaction
                })
                res.json({newUser: data, msg:"User created", success: true});
                await transaction.commit();
            }    
            }

        })
    }
    catch(err){
        res.json({
            Error: err
        })
        await  transaction.rollback();
    }

}