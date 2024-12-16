const mongoose = require('mongoose');

// Student Schema definition
const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to User model (this ties the student to a user account)
    required: true
  },
  skills: {
    type: [String], // An array of strings to store multiple skills. For example: ['JavaScript', 'Node.js', 'React']
    required: true
  },
 
  department: {
    type: String, // Department the student belongs to (e.g., 'Computer Science', 'Engineering', etc.)
    required: true
  },
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job' // Reference to the Job model
  }],
  yearsOfExperience: {
    type: Number, // Number of years of work experience the student has
    default: 0
  },
  resume: {
    type: String, // This will store the path to the uploaded resume (PDF file)
    // required: true
  },
  dateCreated: {
    type: Date, // When the profile was created
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
