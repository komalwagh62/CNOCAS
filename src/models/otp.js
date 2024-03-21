const { DataTypes} = require("sequelize");
const db = require("../../config/database");

const Otp = db.define("Otp", {
    otp_id: { type:DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    user_id : {type:DataTypes.STRING, unique:true},
    otp: {type:DataTypes.STRING},
    expiry_time:{ type: DataTypes.STRING}
});

module.exports = Otp