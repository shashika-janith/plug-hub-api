import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { PassportStatic } from "passport";
import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import User from "../repository/models/user";
import { validatePassword } from "../lib/passwordUtils";
import path from "path";
import fs from "fs";

const customFields: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCb = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "Incorrect username or password." });
      } else if (validatePassword(password, user.passwordHash, user.passwordSalt)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect username or password." });
      }
    })
    .catch((err) => {
      return done(err);
    });
};

const configPassport = (passport: PassportStatic) => {
  const localStrategy = new LocalStrategy(customFields, verifyCb);
  
  passport.use(localStrategy);
  
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });
  
  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });
  
  const pathToPubKey = path.join(__dirname, "..", "cryptography", "id_rsa_pub.pem");
  const pubKey = fs.readFileSync(pathToPubKey, "utf8");
  
  var options: StrategyOptions = {
    secretOrKey: pubKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: ["RS256"],
  };
  
  const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
    console.log("JWT Payload: ", jwt_payload);
    
    User.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        console.log("JWT Error: ", err);
        return done(err, false);
      });
  });
  
  passport.use(jwtStrategy);
}

export default configPassport;