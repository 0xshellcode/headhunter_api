import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import Talent from '../models/talent';
//import HeadHunter from '../models/headhunter';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const talent = Talent.findById(payload.id);
    if (talent) {
      return done(null, talent);
    }

    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});
