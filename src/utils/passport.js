const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const {common} = require('../utils');

const accountController = require('../app/controller/account.controller');
const { JWT_SECRET, JWT_MAX_AGE } = require("./secrets");

passport.serializeUser((user, done) => {
    return done(null, { id: user.id });
});

passport.deserializeUser(async (user, done) => {
    try {
        const getUserResult = await accountController.processGetById(user.id);
        if(!getUserResult.status) {
            return done(null, false);
        }
        const userResult = getUserResult.resultObj;
        if (userResult) {
            userResult.password = undefined;
        }
        return done(null, userResult);
    } catch (err) {
        return done(err);
    }
});

passport.use(new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
        try {
            const getUserResult = await accountController.processGetByUsername(username);
            if(!getUserResult.status) {
                return done(null, false);
            }
            const user = getUserResult.resultObj;
            if (!user || !await common.comparePassword(password, user.password)) {
                return done(null, false);
            } else {
                user.password = undefined;
                return done(null, user);
            }
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
        jsonWebTokenOptions: {
            maxAge: JWT_MAX_AGE,
        },
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            const getUserResult = await accountController.processGetById(payload.sub);
            if(!getUserResult.status) {
                return done(null, false);
            }
            const user = getUserResult.resultObj;
            if (!user) {
                return done(null, false);
            } else {
                req.user = user;
                return done(null, user);
            }
        } catch (err) {
            return done(err);
        }
    })
);