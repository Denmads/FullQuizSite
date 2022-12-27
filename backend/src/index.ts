import { config } from 'dotenv';
config()
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import pg from 'connect-pg-simple';
import cors from 'cors';
import {postgresPool, prisma} from './db';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import {router as authRouter} from './routes/auth';
import { User } from '@prisma/client';

let pgStore = pg(session);

passport.serializeUser(function (user: Express.User, done) {
    process.nextTick(() => {
        done(null, user);
    });
});
passport.deserializeUser(function (user: Express.User, done) {
    process.nextTick(() => {
        done(null, Object.assign({}, user));
    });
});
passport.use(new LocalStrategy(
    async function(username: string, password: string, done) {
        //verify user
        let user: User | null = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if (user == null) {
            return done(null, false, {message: "Incorrect username or password."});
        }

        if (bcrypt.compareSync(password, user.password)) {
            return done(null, {
                id: user.id,
                username: username
            });
        }
        else {
            return done(null, false, {message: "Incorrect username or password."});
        }
    }
));

let app: express.Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    store: new pgStore({
        pool: postgresPool,
        createTableIfMissing: true
    }),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// ================ ROUTES =================
app.use('/', authRouter);

app.on("close", async ()=>{
    await prisma.$disconnect()
});

app.listen(parseInt(process.env.PORT as string), "0.0.0.0", () => {
    console.log('listening on port ' + process.env.PORT);
});