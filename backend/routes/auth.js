const express = require("express");
const router = express.Router();
const { signup, signin, logout, singleUser, userProfile, oauth2Login } = require("../controllers/auth");
const {isAuthenticated} = require("../middleware/auth");

router.post("/signup", signup);
router.post("/signin", signin);
/* router.post("/oauth/callback", oauth2Login); */
router.get("/logout", logout);
router.get("/getme", isAuthenticated, userProfile);
router.get("/user/:id", singleUser);
module.exports = router;
