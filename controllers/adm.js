const JWT = require("jsonwebtoken");
const Config = require("../configuration/config");
const Cryptr = require("cryptr");
const adm = require("../models/adm");
const { result } = require("../configuration/dbConfig");
const cryptr = new Cryptr(Config.cryptR.secret);

AdmloginToken = (admin_data) => {
  return JWT.sign(
    {
      iss: "Reddys",
      sub: admin_data.id,
      name: admin_data.name,
      admin: true,
      iat: Math.round(new Date().getTime() / 1000),
      exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
    },
    Config.jwt.secret
  );
};

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
        user_agent: cryptr.encrypt(req.get("User-Agent")),
      };
      const token = AdmloginToken(adm_data);

      res.status(200).json({ status: 1, token });
    } else {
      let err_data = { password: "Invalied login details" };
      return res.status(400).json({ status: 2, errors: err_data });
    }
  },

  result_data: async (req, res, next) => {
    try {
      let count = 0;
      const { studenet_info, result_part1, result_part2, result_part3 } =
        req.value;

      await adm.addStudentInfo(studenet_info).then(async (resp) => {
        console.log("resp", resp);
        let result_insert;
        for (let i = 0; i < result_part1.length; i++) {
          result_insert = await adm.addStudentResult(resp, result_part1[i]);
          if (!result_insert.result_id) {
            count++;
          }
        }
        console.log("result_insert", result_insert);
        if (count > 0) {
          res
            .status(400)
            .json({
              status: 1,
              data: "error",
            })
            .end();
        }
        res
          .status(200)
          .json({
            status: 1,
            data: result_insert,
          })
          .end();
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({
          status: 3,
          message: error,
        })
        .end();
    }
  },
};
