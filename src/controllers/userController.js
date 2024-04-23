const userService = require("../services/userService");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const jwtconfig = require('../../config/jwt')
const otp = require("../../config/otp")
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// exports.createUSer = async (req, res) => {
//     try {
//         // const user = await User.findOne({ where: { email: req.body.email,phone_number: req.body.phone_number } })
//         const user = await User.findOne({ 
//             where: { 
//                 [Op.or]: [
//                     { email: req.body.email },
//                     { phone_number: req.body.phone_number }
//                 ] 
//             } 
//         });

//         // const user = await User.destroy({ where: { id: req.body.id } })
//         // User.update(userData,{ where: { id: req.body.id } })
//         if (user) {
//             res.status(409).json({ message: "User Already Exists" });
//         }
//         else {
//             const newuser = await userService.createUser(req.body);
//             res.status(201).json(newuser);
//         }

//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

exports.createUSer = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                // [Op.or]: [
                email: req.body.email
                // phone_number: req.body.phone_number 
                // ] 
            }
        });

        if (user) {
            if (user.email === req.body.email) {
                res.status(409).json({ message: "Email already exists" });
            } else {
                res.status(409).json({ message: "Mobile number already exists" });
            }
        } else {
            const newuser = await userService.createUser(req.body);
            res.status(201).json(newuser);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.body.id;
    console.log(req.body)
    try {
        const user = await userService.updateUser(userId, req.body);
        // console.log(user)
        if (!user) {
            res.status(404).json({ message: "User Not found" });
        }
        else {
            let updatedUser = await userService.getUserById(userId);
            //   console.log(updatedUser,"updated data")
            res.status(200).json({ updatedUser, message: "User Updated Successfully" });

        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await userService.deleteUser(userId);
        // const user = await User.destroy({ where: { id: req.body.id } })
        // User.update(userData,{ where: { id: req.body.id } })
        if (result === 0) {
            res.status(404).json({ message: "User Not found" });
        }
        res.status(204).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getUserById = async (req, res) => {
    // console.log(req.user.dataValues,"fghbjnm")
    try {
        const user = await userService.getUserById(req.body.id);

        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(409).json({ message: "User not found" });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getMyProfile = async (req, res) => {
    // console.log(req.user.dataValues,"fghbjnm")
    try {
        const user = await userService.getUserById(req.user.id);

        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(409).json({ message: "User not found" });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};




exports.userLogin = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);

        if (user) {
            // Compare the provided password with the hashed password from the database
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

            if (isPasswordMatch) {
                // Omit password from the user object
                const { password, ...userWithoutPassword } = user.dataValues;
                // Sign the user object (without the password) to generate the token
                const token = jwt.sign(userWithoutPassword, jwtconfig.jwtsecretkey, { expiresIn: jwtconfig.tokenExpiration });
                // Send the token in the response
                return res.status(200).json({ message: "User Login Successfully", success: true, jwttoken: token });
            } else {
                return res.status(404).json({ message: "Incorrect Password", success: false });
            }
        } else {
            return res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
};


exports.updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Retrieve the user by email
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await userService.updateUser(user.id, { password: hashedPassword });

        return res.status(200).json({ message: "Password changed successfully", success: true });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        // Retrieve the user by ID
        const user = await userService.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Compare the current password with the password stored in the database
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Current password is incorrect", success: false });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await userService.updateUser(req.user.id, { password: hashedNewPassword });

        return res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
