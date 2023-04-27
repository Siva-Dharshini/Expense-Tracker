const express=require("express")

const authRouter=require("./Auth")
const verifyJwt=require("../../middlewares/Authentication")
const categoryRouter=require("./Category")
const expenseRouter=require("./Expense")

const router=express.Router()

router.use("/auth",authRouter)
router.use(verifyJwt)
router.use("/categories",categoryRouter)
router.use("/expenses",expenseRouter)

module.exports=router
