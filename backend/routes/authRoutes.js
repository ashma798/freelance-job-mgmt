const router = require("express").Router();
const middleware = require("../Middlewares/auth");
const parser = require('../utils/cloudinaryStorage');
const uploads = require("../Middlewares/multer1");
const {userLogin,userRegistration} = require("../Controllers/authController");

router.post('/register',uploads.single("image"),userRegistration);
router.post('/login',userLogin);
module.exports = router;