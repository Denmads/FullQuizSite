import pg from 'pg';
import {PrismaClient} from '@prisma/client';

// ENV variables and defaults
// PGHOST=localhost
// PGUSER=process.env.USER
// PGDATABASE=process.env.USER
// PGPASSWORD=null
// PGPORT=5432
let postgresPool = new pg.Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});


let prisma = new PrismaClient();

export {postgresPool, prisma};