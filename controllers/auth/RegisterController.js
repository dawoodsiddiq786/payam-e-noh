const registerURL             = '/api/v1/register';
const { nodeRender }          = require('../../helpers/RenderHelper');
const { registerValidation }  = require('../../requests/RegistrationRequest');
const Requests                = require('../../plugins/Requests/Requests');

const TestRequest             = require('../../requests/TestRequest');
const registerInputValidate = require("../../inputFieldValidation/registerValidation");
const User = require("../../models/Users");

const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

/**
 * Register Controller
 */
const RegisterController = module.exports = {
    /**
     * Register
     * @param req
     * @param res
     */
    register : (req, res) => {

      let validation = new Requests(req, [
        {name: new TestRequest()},
      ]).validate();

      if( validation.valid() === false ) {
        console.log(validation.errors);
      }

      nodeRender('home/auth/register', req, res, {layout: 'login-register-layout'});
    },

    /**
     * Registration
     * @param req
     * @param res
     */
    store: (req, res) => {
      //Sending a promise if user exists or not
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          var errors = "User already exists";
          return res.status(400).json(errors); // sending error status code
        } else {
          //Used gravatar for providing unique avatar to all users
          const avatar = gravatar.url(req.body.email, {
            //If user already has a gravatar then that will be used else default avatar will be used
            s: "200", //Size
            r: "pg", //rating
            d: "mm" //Default
          });

          const newUser = new User({
            first_name: req.body.first_name,
            email: req.body.email,
            password: req.body.password,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            password : req.body.password,
            profile_pic : avatar,
            contact_number : req.body.phone,
            role_id  : 0
          });

          //Used bcrypt for password hashing
          bcrypt.genSalt(10, (err, salt) => {
            //Generating salt
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              //Creating hash
              if (err) throw err;
              newUser.password = hash; //setting password to the hash
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
};
