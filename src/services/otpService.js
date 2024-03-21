const Otp = require("../models/otp");

// Function to save OTP data
const saveOtp = async (otpData, id) => {
    try {
        let saveotp = await Otp.findOne({ where: { user_id: otpData.user_id } });
        if (saveotp) {
            return await Otp.update(otpData, { where: { user_id: id } });
        } else {
            return await Otp.create(otpData);
        }
    } catch (error) {
        console.error('Error saving OTP data:', error);
        throw error;
    }
};

// Function to get OTP data by user ID
const getOtpByUserId = async (userId) => {
    try {
        const otpData = await Otp.findOne({ where: { user_id: userId } });
        return otpData;
    } catch (error) {
        console.error('Error fetching OTP data:', error);
        throw error;
    }
};

module.exports = {
    saveOtp,
    getOtpByUserId
};


exports.updatePassword = async (userId, newPassword) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.password = newPassword; // Assuming you have a field named 'password' in your User model
      await user.save();
      return { message: 'Password updated successfully' };
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };