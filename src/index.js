const express = require('express')
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const studentRoutes = require("./routes/studentRouter");
const companyRoutes = require("./routes/companyRoute")
const jobRoutes = require("./routes/jobsRouter")

const path = require('path')

dbConnect();

const app = express();

// File upload.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use()



// Start the server

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})