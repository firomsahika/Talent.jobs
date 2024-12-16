const express = require('express');

const {postJob, getCompanyJob,getAllJobs, jobDetail,applyJob, viewApplications} =  require('../controllers/jobController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();


router.post("/post",verifyToken, postJob);
router.get("/company",verifyToken, getCompanyJob);
router.get("/:id", jobDetail);
router.post("/:id/apply",verifyToken,applyJob);
router.get("/:id/applications",verifyToken, viewApplications)
router.get("/", getAllJobs)


module.exports = router;