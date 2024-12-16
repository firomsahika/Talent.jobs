const express = require('express');
const { createStudentProfile, updateStudentProfile, getStudentProfile, saveJob, getSavedJobs, deleteSavedJobs } = require("../controllers/studentController")
const verifyToken = require("../middlewares/authMiddleware")
const upload = require("../config/multerConfig")

const router = express.Router();

router.post("/profile/create", verifyToken, upload.single('resume'), createStudentProfile);
router.get("/profile", verifyToken, getStudentProfile);
router.put("/profile/update", verifyToken,upload.single('resume'), updateStudentProfile);
router.post("/:id/save-job", saveJob);
router.get("/:id/saved-jobs",  getSavedJobs);
router.delete(`"/:id/saved-jobs/:job_id"`,deleteSavedJobs);


module.exports = router;