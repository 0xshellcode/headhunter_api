import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import User from '../models/user';
//import Talent from '../models/talent';
//import HeadHunter from '../models/headhunter';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = User.findById(payload.id);
    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});
