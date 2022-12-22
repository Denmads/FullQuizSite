import express from 'express';
import session from 'express-session';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import pg from 'connect-pg-simple';
import cors from 'cors';

import authRouter from './routes/auth.js';

let pgStore = pg(session);

passport.serializeUser(function (user, done) {

});
passport.deserializeUser(function (user, done) {

});
passport.use(new LocalStrategy(
    function(username, password, done) {
        //verify user
    }
));

let app = express();
app.use(cors());
// app.use(session({
//     secret: "", //enter a secret
//     // uses the env variable DATABASE_URL, should contain psotgres connection string
//     store: new pgStore(),
//     createTableIfMissing: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());


// ================ ROUTES =================
app.use('/', authRouter);

app.listen(process.env.PORT, "0.0.0.0",() => {
    console.log('listening on port ' + process.env.PORT);
});