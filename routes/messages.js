const router = require("express").Router()
const verifyUser = require("../middlewares/verifyUser")
const {allMessages, sendMessage} = require("../controllers/messageController")

router.get("/:chatId", verifyUser, allMessages);
router.post("/", verifyUser, sendMessage);

module.exports = router;