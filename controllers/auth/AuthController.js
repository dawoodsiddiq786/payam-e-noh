/**
 * Authentication Controller
 */
 const { nodeRender }          = require('../../helpers/RenderHelper');
 const User = require("../../models/Users");
 const loginInputValidate = require("../../inputFieldValidation/loginValidation");
 const gravatar = require("gravatar");

 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");
 const passport = require("passport");

const AuthController = module.exports = {
    /**
     * Login
     * @param req
     * @param res
     */
    view : (req, res) => {
      nodeRender('home/auth/login', req, res, {layout: 'login-register-layout'});
    },

    login : (req, res) => {
      const { errors, isValid } = loginInputValidate(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const email = req.body.email;
      const password = req.body.password;

      //Finding user through email
      User.findOne({ email }).then(user => {
        if (!user) {
          //If user not found then send error code
          errors.email = "User not found";
          return res.status(404).json(errors);
        }

        //Comparing passwords
        bcrypt
          .compare(password, user.password) //'password' is the password typed at login and user.password is the hashed password stored in db
          .then(isMatch => {
            if (isMatch) {
              //if password is matched then
              const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload

              jwt.sign(
                payload,
                global.connectPool.secretOrKey, //This key is present in config/keys file
                { expiresIn: 7200 }, //Time in seconds the token stays valid
                (err, token) => {
                  res.json({
                    success: true,
                    token: token //Token value
                  });
                }
              );
            } else {
              //if password not matched then send error code and message
              errors.password = "Wrong Password";
              return res.status(400).json(errors);
            }
          });
      });
      // nodeRender('auth/login', req, res, {layout: 'login-register-layout'});
    }
};
