const express=require("express")

const authRouter=require("./Auth")

const router=express.Router()

router.use("/auth",authRouter)

module.exports=router
