const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const Provider = require('../models/Provider');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Provider.findOne({email: jwt_payload.email})
      .then(provider => {
        if (provider) {
          return done(null, provider);
        }
        return done(null, false);
      })
      .catch(err => console.log(err))
  }))
}