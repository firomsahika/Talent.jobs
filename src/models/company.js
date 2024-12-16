const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    industry:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    jobsPosted:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Job'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model("Company", companySchema)