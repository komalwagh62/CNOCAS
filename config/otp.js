// const nodemailer = require("nodemailer")
// const crypto = require('crypto');

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'komalwagh62@gmail.com', // Your email address
//         pass: 'Komal@123' // Your email password or App Password for Gmail
//     }
// });


// async function sendOtp(email,otp){
//     const mailOptions = {
//         from: "komalwagh62@gmail.com",
//         to: email,
//         subject: "Your OTP for Verification",
//         text: `Your OTP is: ${otp}`,
//     };

//     try{
//         await transporter.sendMail(mailOptions);
//         console.log("Otp sent succesfully.");

//     }
//     catch (error){
//         console.log("Error sending OTP:",error);
//         throw error;
//     }
// }



// function generateOTP() {
//     // Generate a random 4-digit number
//     const otp = Math.floor(1000 + crypto.randomInt(9000));
//     return otp.toString(); // Convert to string
// }


// module.exports = {generateOTP,sendOtp}


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'swrshoppingmall2022@gmail.com', // Your email address
        pass: 'xpuamltsdkjuzevj' // Your email password or App Password for Gmail
    }
});

const sendOtp = async (email, otp) => {
    const mailOptions = {
        from: "swrshoppingmall2022@gmail.com",
        to: email,
        subject: "Your OTP for Verification",
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully.");
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
}

const generateOTP = () => {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString(); // Convert to string
}

module.exports = { generateOTP, sendOtp };
