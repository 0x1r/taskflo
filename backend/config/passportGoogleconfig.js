import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_REDIRECTURI
  },
   function(accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      return cb(null, profile);
  }
));

// console.log("passport object id in config:", passport._strategies);
export default passport;


