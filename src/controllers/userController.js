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
    // console.log(req.body)
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
        const user1 = await userService.getUserByEmail(req.body.email);
        if (user1) {
            if (user1.password === req.body.password) {
                // Omit password from the user object
                const { password, ...user } = user1.dataValues;
                // Sign the user object (without the password) to generate the token
                const token = jwt.sign(user, jwtconfig.jwtsecretkey, { expiresIn: jwtconfig.tokenExpiration });
                // Send the token in the response
                res.status(200).json({ message: "User Login Succesfully", success: true, jwttoken: token });
            } else {
                res.status(404).json({ message: "Password not exists", success: false });
            }
        } else {
            res.status(404).json({ message: "Email not found", success: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};


exports.updatePassword = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user1 = await userService.getUserByEmail(req.body.email);
        // user1.password = password
        let newUser = { ...user1, password }
        console.log(newUser.id, user1.id)
        userService.updateUser(user1.id, newUser)

        res.status(200).json({ message: "password change succesfully", success: true })
    } catch (error) {

        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}




exports.changePassword = async (req, res) => {
    
    const { currentPassword, newPassword } = req.body;
    
    
    try {
        // Retrieve the user from the database
        const user = await userService.getUserById(req.user.id);
// console.log(req.user,"kmdf")
        if (user) {
            if (user.password === currentPassword) {
              
              
                await userService.updateUser(req.user.id, {password: newPassword})

                res.status(200).json({ message: 'Password updated succesfully', success: true });
            }
            else {
                // console.log("sumant")
               res.status(400).json({ message: 'current password is not match' });
                
            }
        }

        else {
            // console.log("koaml")
             res.status(404).json({ message: 'User not found' });
        }

        
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};





