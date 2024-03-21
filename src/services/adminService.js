const Admin = require("../models/admin");

exports.createAdmin = async (adminData) => {
    return Admin.create(adminData);
}