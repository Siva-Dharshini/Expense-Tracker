const express=require("express")

const authRouter=require("./Auth")
const verifyJwt=require("../../middlewares/Authentication")

const router=express.Router()

router.use("/auth",authRouter)
router.use(verifyJwt)

module.exports=router
