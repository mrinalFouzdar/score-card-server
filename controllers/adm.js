const JWT = require("jsonwebtoken");
const Config = require("../configuration/config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(Config.cryptR.secret);

AdmloginToken = (admin_data)=>{
    return JWT.sign(
        {
            iss:"Reddys",
            sub:admin_data.id,
            name: admin_data.name,
            admin: true,
			iat: Math.round(new Date().getTime() / 1000),
            exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
        },
        Config.jwt.secret
    )
}

module.exports = {
  handle_auth: async (req, res, next) => {
    // console.log("hello world")
    // console.log(req.user)
    if (Number.isInteger(req.user.id) && req.user.id > 0) {
      next();
    } else {
      let err_data = { password: "Invalid login details" };
      return res.status(401).json({ status: 2, errors: err_data });
    }
  },

  login: async (req, res, next) => {
    if (Number.isInteger(req.user.id) && req.user.id > 0) {
      let adm_data = {
        id: cryptr.encrypt(req.user.id),
        name: cryptr.encrypt(req.user.username),
      };
      const token = AdmloginToken(adm_data);

      res.status(200).json({ status:1,token})
    }else{
        let err_data = { password : "Invalied login details" };
        return res.status(400).json({ status: 2, errors: err_data });
    }
  },
};
