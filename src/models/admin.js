const { DataTypes} = require("sequelize");
const db = require("../../config/database");

const Admin = db.define("Admin", {
    name: { type:DataTypes.STRING},
    phone_number : {type:DataTypes.STRING},
    address: {type:DataTypes.STRING},
    email:{ type: DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING}
});

module.exports = Admin