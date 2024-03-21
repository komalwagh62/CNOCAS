const router = require("express").Router()
const adminController = require("../controllers/adminController")
router.post("/createAdmin",adminController.createAdmin)
module.exports = router