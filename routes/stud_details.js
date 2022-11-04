const express = require("express");
const passport = require("passport");
const admController = require("../controllers/adm");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/userValidate");
const { validateDB } = require("../helpers/userdbValidate");
require("../passport");
const passportJWT = passport.authenticate("jwtAdm", { session: false });

const router = express.Router();
// console.log(router);

router.post(
  "/details",
  passportJWT,
  admController.handle_auth,
  validateBody(schemas.userSchema),
  validateDB,
  admController.result_data
);

router.get(
  "/details",
  passportJWT,
  admController.handle_auth,
  admController.student_list
);

router.get(
  "/details/:id",
  passportJWT,
  admController.handle_auth,
  validateParam(schemas.get_admin),
  admController.student_result
);

router.delete(
  "/details/:id",
  passportJWT,
  admController.handle_auth,
  validateParam(schemas.delete_admin),
  admController.delete_result
);
router.put(
  "/details",
  passportJWT,
  admController.handle_auth,
  validateBody(schemas.updateSchema),
  admController.update_result
);

module.exports = router;
