const router = require("express").Router()
const verifyUser = require("../middlewares/verifyUser")
const {accessChat, fetchChats, createGroup, renameGroup, addToGroup, removeFromGroup} = require("../controllers/chatController")

router.post("/", verifyUser, accessChat);
router.get("/", verifyUser, fetchChats);
router.post("/group", verifyUser, createGroup);
router.put("/renamegroup", verifyUser, renameGroup);
router.put("/groupadd", verifyUser, addToGroup);
router.put("/groupremove", verifyUser, removeFromGroup);

module.exports = router;