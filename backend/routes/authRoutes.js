const router = require("express").Router();
const middleware = require("../Middlewares/auth");
const uploads = require("../Middlewares/multer");
const {userLogin,userRegistration} = require("../Controllers/authController");

router.post('/register',uploads.single("image"),userRegistration);
router.post('/login',userLogin);
module.exports = router;