const express = require('express');

const {postJob, getCompanyJob,getAllJobs, jobDetail,applyJob, viewApplications} =  require('../controllers/jobController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();


router.post("/post",verifyToken, postJob);



module.exports = router;