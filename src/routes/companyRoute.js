const express = require('express');
const {createCompanyProfile,
    updateCompanyProfile,
    getCompanyProfile} = require("../controllers/companyController");
const {getCompanyJob} = require("../controllers/jobController")
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/profile/create',verifyToken, createCompanyProfile);
router.put('/profile/update',verifyToken, updateCompanyProfile)
router.get('/jobs',verifyToken, getCompanyJob);
router.get('/profile',verifyToken, getCompanyProfile);

module.exports = router;