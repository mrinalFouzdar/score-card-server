const express = require("express");
const passport = require("passport");
const { dummyFunction } = require("../controllers/auth");
const { validateBody, schemas } = require("../helpers/admValidate");
// const passportSignIn = passport.authenticate("localAdm",{session:false});
require('../passport');
const passportSignIn = passport.authenticate('localAdm', { session: false });

const router = express.Router();

router.get("/dummyapi",dummyFunction)
router.post('/login',passportSignIn)
// router.post('/login',
// // (req,res,next)=>{
// //     console.log(req.body);
    
// // }
//     validateBody(schemas.authSchemas)
// )

module.exports=router;
