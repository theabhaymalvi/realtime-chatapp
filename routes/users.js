const router = require("express").Router()
const {registerUser, loginUser, allUsers, updateStatus} = require("../controllers/userController")
const verifyUser = require("../middlewares/verifyUser")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", verifyUser, allUsers);
router.put("/", verifyUser, updateStatus);

module.exports = router;