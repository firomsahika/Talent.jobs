const Company = require("../models/company")
const Job = require("../models/job")


const createCompanyProfile = async (req, res) => {
    try {
        const {
            name,
            description,
            industry,
            location,
            website,
        } = req.body;

        const company = await Company.findOne({ user: req.user.id });

        if (company) {
            return res.status(200).json({ message: "Company profile already exist!" })
        }

        const newCompany = new Company({
            user: req.user.id,
            name,
            description,
            industry,
            location,
            website,

        })

        await newCompany.save();

        return res.status(201).json({ message: "Company created successfully!", company })

    } catch (err) {
        console.error(err)
        res.status(500).json({ messsage: "Something went wrong!" })
    }
}

const updateCompanyProfile = async (req, res) => {
    try {
        const {
            name,
            description,
            industry,
            location,
            website,
            jobsPosted,
        } = req.body;

        const company = await Company.findOne({ user: req.user.id });
        if (company) {
            company.name = name;
            company.description = description;
            company.industry = industry;
            company.location = location;
            company.website = website;
            company.jobsPosted = jobsPosted;

            await company.save();

            return res.status(201).json({ message: "Company profile updated successfully!" })
        }

        return res.status(404).json({ message: "Company profile not found, please create a profile first!" })

    } catch (err) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}

const getCompanyProfile = async (req, res) => {
    try {
        const company = await Company.findOne({ user: req.user.id }).populate('user');

        if (!company) {
            return res.status(404).json({ message: "Company profile doesn't exist!" })
        }

        const jobs = await Job.find({company:company.id})
        console.log({jobs})
        return res.status(200).json({ company });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops! Something went wrong!" })
    }
}


module.exports = {
    createCompanyProfile,
    updateCompanyProfile,
    getCompanyProfile
}

