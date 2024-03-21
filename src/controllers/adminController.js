const adminService = require("../services/adminService");

exports.createAdmin = async (req,res) => {
    try{
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json(admin);
    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
};