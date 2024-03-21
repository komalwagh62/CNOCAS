const { DataTypes} = require("sequelize");
const db = require("../../config/database");

const User = db.define("User", {
    id: { type:DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    uname: { type:DataTypes.STRING},
    phone_number: { type:DataTypes.STRING},
    address: { type:DataTypes.STRING},
    email: { type: DataTypes.STRING, unique:true},
    password: { type:DataTypes.STRING}
});

module.exports = User;
