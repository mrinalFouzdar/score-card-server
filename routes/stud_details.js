const express = require("express");
const passport = require("passport");
const admController = require("../controllers/adm");
const {validateBody, schemas} = require("../helpers/userValidate")
require("../passport")
const passportJWT = passport.authenticate('jwtAdm', { session: false });

const router = express.Router();
// console.log(router);

router.post("/details", passportJWT,admController.handle_auth, validateBody(schemas.userSchema), admController.result_data)


module.exports = router;
