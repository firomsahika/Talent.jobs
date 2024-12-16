const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry-Level', 'Mid-Level', 'Senior-Level'],
    default: 'Entry-Level'
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    required: true
  },
  salaryRange: {
    type: String
  },
  location: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  applicationDeadline: {
    type: Date,
    required: true
  }
})

module.exports = new mongoose.model('Job', jobSchema)