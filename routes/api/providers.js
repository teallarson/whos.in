const express = require("express");
const bcrypt = require('bcryptjs');
const Provider = require('../../models/Provider');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
const keys = require('../../config/keys');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const validateChangepwInput = require('../../validation/changepw');
const router = express.Router();


//@route    POST    /api/providers/register
//@desc     Register provider
//@access   Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Provider.findOne({email: req.body.email}).then((provider) => {
    if(provider) {
      return res.status(404).json({ email: "Email already registered" });
    } else {
      const newProvider = new Provider({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newProvider.password, salt, (err, hash) => {
          if (err) throw err;
          newProvider.password = hash;
          newProvider 
            .save()
            .then((provider) => res.json(provider))
            .catch((err) => console.log(err))
        });
      });
    }
  })
  .catch((err) => console.log(err))
});

//@route    POST    /api/providers/login
//@desc     Log in provider
//@access   Public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Provider.findOne({ email })
    .then((provider) => {
      if (!provider) return res.status(404).json({ email: "provider not found" });

      //check password
      bcrypt 
        .compare(password, provider.password)
        .then((isMatch) => {
          if(isMatch){
            //provider matched, create token
            const payload = {
              email: provider.email,
            };

            jwt.sign(
              payload,
              keys.secretOrKey, 
              { expiresIn: 3600 },
              (err, token) => {
                return res.json({token: `Bearer ` + token});
              }
            );
          } else {
            return res.status(400).json({ password: "Invalid password" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch(err => console.log(err))
});

//'current' route for testing passport on serverside without UI
//@route    GET   api/providers/current
//@desc     Return current provider
//@access   Private

router.get('/current', 
  passport.authenticate('jwt', {
  session: false}), (req, res) => {
    return res.json(req.provider);
  }
);

//@route    POST  /api/providers/forgotpw
//@desc     Reset provider's password
//@access   Public
router.post('/forgotpw', (req, res) => {
  const email = req.body.email;
  let newPassword = JSON.stringify(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);

  //find a provider with that email
  Provider.findOne({ email })
    .then((provider) => {
      if(!provider) {
        return res.status(404).json({
          email: "Provider not found"
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            Provider.updateOne(
              { email: email },
              { $set: { password: newPassword }}
            ).then((provider) => {
              res.json(provider)
            });
          });
        });
        var transporter = nodemailer.createTransport(keys.smtp);

        //set up email data with unicode symbols
        var mailOptions = {
          from: req.body.email,
          to: email,
          subject: "Provider portal temporary passowrd",
          text: "Temporary password: " + newPassword,
        };

        //send email with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
          if(!error){
            res.send("Email sent");
          } else {
            res.sendStatus(`Failed, error: ${error}`);
          }
          transporter.close();
          console.log("Message sent: " + info.response )
        });
      }
    })
    .catch((err) => console.log(err));
});

//@route  POST  /api/providers/changepw
//@desc   Change provider's password
//@access Private
router.post(
  '/changepw', 
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateChangepwInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
    
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    Provider.findOne({ email })
      .then((provider) => {
        if (!provider) {
          return res.status(404).json({ email: "Provider not found"});
        }
        bcrypt  
          .compare(oldPassword, provider.password)
          .then((isMatch) => {
            if(isMatch) {
              //provider matched
              bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;
                bcrypt.hash(newPassword, salt, (err, hash) => {
                  if (err) throw err;
                  provider.newPassword = hash;
                  Provider.updateOne(
                    { email: req.body.email },
                    { $set: { password: provider.newPassword }}
                  )
                    .then((provider) => { res.json(provider)})
                    .catch((err) => console.log(err));
                });
              });
            } else {
              console.log("Could not change password. Try again later.")
            }
          })
          .catch((err => console.log(err)));
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;