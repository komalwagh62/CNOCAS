const authenticateToken = require("../../middleware/authenticate")
const checkSubscription = require("../../middleware/subscription")
const router = require("express").Router()
const subscriptionController = require("../controllers/subscriptionController")


router.post("/addSubscription",authenticateToken,checkSubscription,subscriptionController.addUserSubscription)
router.get("/getSubscription",subscriptionController.getUserSubscription)

module.exports = router