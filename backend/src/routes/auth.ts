import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import {prisma} from '../db';
import { User } from '@prisma/client';

let router: Router = Router();

router.post('/signup', (req, res, next) => {
    const {username, password} = req.body;
    bcrypt.hash(req.body.password, 10, (err: Error |undefined, hashed: string) => {
        if (err) return next(err);

        prisma.user.create({
            data: {
            username: username, 
            password: password
        }})
        .catch((err: any) => {
            next(new Error(err));
        })
        .then((user: User | void) => {
            let sessUser = {
                id: user!.id,
                username: user!.username
            };
            req.login(sessUser, (err) => {
                if (err) return next(err);
                res.status(200).end();
            });
        });
    });
});

// TODO: CHANGE
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { res.status(401).end(); }

        req.login(user, next);
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).end();
    })
});

function requireAuth(onFail: ((req: Express.Request, res: any, next:any) => void) | null){
    return (req: Express.Request, res: any, next: any) => {
        if (req.isAuthenticated()) { return next() }
        if (onFail != null)
            onFail(req, res, next)
        else
            res.status(401).end();
    }
}

export {router, requireAuth};