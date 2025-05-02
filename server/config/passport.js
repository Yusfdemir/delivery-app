const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secretKey = require("./key");
const User = require("../models/user")

module.exports=(passport)=>{
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = secretKey

    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        User.findById(jwt_payload.id,(err,user)=>{
            if(err){
                return done(err,false)
            }
            if(user){
                return done(null,user)
            }
            else{
                return done(null,false)
            }
        })
    }));
}