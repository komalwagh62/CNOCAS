const otpService = require("../services/otpService");
const { sendOtp, generateOTP } = require('../../config/otp');
const userService = require("../services/userService")



exports.sendOtp = async (req, res) => {
    
    const { email } = req.body;
    console.log(email,"gyhbj")
        try {
            const user = await userService.getUserByEmail(email);
            // Send success response
            if(user){
                try {
                    // Generate OTP
            
            
                    const otp = generateOTP();
            
                    // Send OTP via email
                    await sendOtp(user.email, otp);
                    let otpData = {user_id:user.id,otp:otp}
                    console.log(otpData,"otpdata")
                    otpService.saveOtp(otpData,user.id);
                    
            
                    // Send success response
                    res.status(200).json({ message: 'OTP sent successfully.' });
                } catch (error) {
                    // Send error response
                    console.error('Error sending OTP:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
            else{
                 res.status(404).json({ error: 'User Not Found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
};


exports.validateOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // Get the user by email
        const user = await userService.getUserByEmail(email);
        
        if (user) {
            // Get the OTP saved in the database for the user
            const savedOtp = await otpService.getOtpByUserId(user.id);
            
            if (savedOtp) {
                // Compare the OTP entered by the user with the OTP saved in the database
                if (savedOtp.otp === otp) {
                    // OTP is valid
                    res.status(200).json({ valid: true, message: 'OTP is valid.' });
                } else {
                    // Invalid OTP
                    res.status(400).json({ valid: false, error: 'Invalid OTP.' });
                }
            } else {
                // OTP data not found
                res.status(404).json({ valid: false, error: 'OTP data not found.' });
            }
        } else {
            // User not found
            res.status(404).json({ valid: false, error: 'User not found.' });
        }
    } catch (error) {
        // Internal server error
        console.error('Error validating OTP:', error);
        res.status(500).json({ valid: false, error: 'Internal Server Error' });
    }
};
