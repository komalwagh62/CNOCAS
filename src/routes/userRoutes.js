const router = require("express").Router()
const usercontroller = require("../controllers/userController")
const authenticateToken = require("../../middleware/authenticate")


router.post("/createUser",usercontroller.createUSer)
router.get("/",usercontroller.getAllUsers);
router.post("/myProfile",authenticateToken,usercontroller.getMyProfile);

router.put("/updateUser", usercontroller.updateUser);
router.delete("/:id",usercontroller.deleteUser);

router.post("/getUser",usercontroller.getUserById)
router.post("/userLogin",usercontroller.userLogin)

router.post('/updatePassword',usercontroller.updatePassword)

router.post("/changePassword",authenticateToken,usercontroller.changePassword);
module.exports = router;
