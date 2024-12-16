const Student = require("../models/student")


const createStudentProfile = async (req, res) => {
    try {
        const { skills, department, yearsOfExperience, resume } = req.body;
        const resumePath = req.file ? req.file.path : null;

        console.log("User ID:", req.user.id);
        const student = await Student.findOne({ user: req.user.id });
        if (!student) {
            const newStudent = new Student({
                user: req.user.id,
                skills,
                department,
                yearsOfExperience,
                resume:resumePath
            })
            await newStudent.save();

            return res.status(201).json({ message: "Student created successfully!" })
        }

        res.status(200).json({message: "Student present!"})

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somethig went wrong" })
    }
}

const updateStudentProfile = async (req, res) => {
    try {
        const { skills, department, yearsOfExperience, resume } = req.body;
        const resumePath = req.file ? req.file.path : null;

        console.log("User ID:", req.user.id);
        const student = await Student.findOne({ user: req.user.id });
        if (!student) {
            const newStudent = new Student({
                user: req.user.id,
                skills,
                department,
                yearsOfExperience,
                resume:resumePath
            })
            await newStudent.save();

            return res.status(201).json({ message: "Student created successfully!" })
        }else{
            student.user = req.user.id
            student.skills = skills;
            student.department = department;
            student.yearsOfExperience = yearsOfExperience;
            student.resume = resumePath || student.resume;

            await student.save();
            return res.status(201).json({message: "Student updated successfully!"})
        }

        res.status(200).json({message: "Student present!"})

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somethig went wrong" })
    }
}

const getStudentProfile = async (req, res) => {

    try {

        const student = await Student.findOne({ user: req.user.id }).populate('user');

        if (!student) {
            return res.status(404).json({ message: "Student profile not found!" })
        }

        res.status(200).json({ student })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching profile, Some thing went wrong" });
    }
}


const saveJob = async (req,res) => {
    try {
        const studentId = req.params.id;
        const jobId = req.body.jobId;

        const student = await Student.findById(studentId);

        if(!student){
            res.status(400).json({message: "Student not found!"});
        }

        if(student.savedJobs.includes(jobId)){
            res.status(400).json({message: "Job is already saved!"})
        }

        student.savedJobs.push(jobId);
        await student.save();

        res.status(200).json({message: "Jobs saved successfully!    "})



    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Oops, Something went wrong!"})
    }
}

const getSavedJobs = async (req,res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId).populate('savedJobs');

        if(!student){
            res.status(400).json({message: "Student not found!"});
        }

        res.status(200).json({savedJobs: student.savedJobs})

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Oops, Something went wrong!"})
    }
}

const deleteSavedJobs = async (req,res) => {
    try {
        const studentId = req.params.id;
        const jobId = req.params.job_id;

        const student = await Student.findById(studentId);

        if(!student){
            res.status(400).json({message: "Student not found!"});
        }

        const jobIndex = student.savedJobs.indexOf(jobId);

        if(jobIndex === -1){
            res.status(404).json({message: "Job not found in saved jobs!"});
        }

        student.savedJobs.splice(jobIndex,1);

        await student.save();

        res.status(200).json({message: "Job removed successfully!"})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Oops, Something went wrong!"})
    }
}

module.exports = {
    createStudentProfile,
    updateStudentProfile,
    getStudentProfile,
    saveJob,
    getSavedJobs,
    deleteSavedJobs
}
