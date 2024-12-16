const Job = require('../models/job')
const Company = require("../models/company");
const Application = require("../models/jobApplication");


const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requiredSkills,
            experienceLevel,
            jobType,
            salaryRange,
            location,
            postedAt,
            applicationDeadline,
        } = req.body;

        const company = await Company.findOne({ user: req.user.id });
        console.log(company.id);
        if (!company) {
            return res.status(404).json({ message: "Company profile not found. Please create a profile first." });
        }

        const job = new Job({
            title,
            description,
            requiredSkills,
            experienceLevel,
            jobType,
            salaryRange,
            location,
            postedAt,
            applicationDeadline,
            company: company.id
        })

        await job.save();

        company.jobsPosted.push(job.id);
        await company.save();

        return res.status(201).json({ message: "Job posted successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops!, Something went wrong!" })
    }
}

const getCompanyJob = async (req, res) => {
    try {
        // Find the job for the given company and populate the company field
        const company = await Company.findOne({user:req.user.id})
        const job = await Job.findOne({ company: company.id }).populate('user');

        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json({ job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops! Something went wrong!" });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company');

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found." });
        }

        res.status(200).json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops! Something went wrong!" })
    }
}


const jobDetail = async (req,res) =>  {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json({job});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops! Something went wrong!" })

    }
};
const applyJob = async (req,res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }

        const existingApplication = await Application.findOne({job: jobId, user:userId});

        if(existingApplication){
            return res.status(400).json({ message: "You have already applied to this job" });
        }

        const newApplication = new Application({
            job: jobId,
            user: userId,
            status:"pending"
        })

        await newApplication.save();

        return res.status(200).json({message: "Application submitted successfully!"})

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops! Something went wrong!" })

    }
};
const viewApplications = async (req,res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }

        if(job.company.toString() !== userId){
            return res.status(403).json({ message: "You are not authorized to view applications for this job" });
        }

        const applications = await Application.find({job:jobId}).populate('user');


        return res.status(200).json({applications});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops! Something went wrong!" })
    }
};



module.exports = {
    postJob,
    getCompanyJob,
    getAllJobs,
    jobDetail,
    applyJob,
    viewApplications
}