const User = require("../models/User")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "Users not FOound" });
        }

        return res.status(200).json({ users })
    } catch (err) {
        res.status(500).json({ message: "Oops! Something went wrong !" })
    }
}


module.exports = {
    getAllUsers,
};