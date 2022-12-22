import express from 'express';

let router = express.Router();

router.get('/login', (req, res) => {
    res.end('login');
});

export default router;