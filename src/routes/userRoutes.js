const express = require('express');
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/roleMiddleware");
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();
// Only admin can access
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
   res.json({message: "welcome admin"})
})

// both admin and user can access
router.get("/student",verifyToken,authorizeRoles("admin","student"), (req,res)=>{
    res.json({message: "welcome student"})
 })

// both admin and company can access
router.get("/company",verifyToken,authorizeRoles("admin", "company"), (req,res)=>{
    res.json({message: "welcome company"})
 })

// all users can access
router.get("/user",verifyToken,authorizeRoles("admin", "student","company","user"), (req,res)=>{
    res.json({message: "welcome user"})
 })

 router.get('/', getAllUsers);

 module.exports = router;

