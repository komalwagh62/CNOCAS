const User = require("../models/user");
const bcrypt = require('bcrypt');


exports.createUser = async (userData) => {
    return User.create(userData);
}

exports.getUserById = async (userId) => {
    return User.findByPk(userId);
}

exports.updateUser = async (userId,userData) => {
    return User.update(userData, {where: {id: userId}});
}

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email} })
    return user
}




// exports.changePassword = async (userId, currentPassword, newPassword) => {
//     try {
//         // Retrieve the user from the database
//         const user = await User.findByPk(userId);

//         // Check if the user exists
//         if (!user) {
//             throw new Error('User not found.');
//         }

//         // Log the current password from the request and the password retrieved from the database
//         console.log('Current Password:', currentPassword);
//         console.log('Database Password:', user.password);

//         // Compare the current password provided in the request with the password stored in the database
//         const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
//         console.log('Password Comparison Result:', isPasswordValid);
        
//         if (!isPasswordValid) {
//             throw new Error('Incorrect current password.');
//         }

//         // Hash the new password before storing it in the database
//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedNewPassword;
//         await user.save();

//         return 'Password updated successfully.';
//     } catch (error) {
//         throw error;
//     }
// };







// const nodemailer = require("nodemailer");

// // Create a transporter using Gmail SMTP
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'komalwagh62@gmail.com', // Your Gmail address
//         pass: 'Komal@123' // Your Gmail password or App Password if 2FA is enabled
//     }
// });

// // Function to send OTP via email
// async function sendOtp(email, otp) {
//     const mailOptions = {
//         from: 'komalwagh62@gmail.com',
//         to: email,
//         subject: 'Your OTP for Verification',
//         text: `Your OTP is: ${otp}`,
//     };

//     try {
//         // Send the email
//         await transporter.sendMail(mailOptions);
//         console.log("OTP sent successfully.");
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         throw error;
//     }
// }

// // Function to generate a random 4-digit OTP
// function generateOTP() {
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     return otp.toString(); // Convert to string
// }

// module.exports = { generateOTP, sendOtp };
