import pg from 'pg';

// ENV variables and defaults
// PGHOST=localhost
// PGUSER=process.env.USER
// PGDATABASE=process.env.USER
// PGPASSWORD=null
// PGPORT=5432
let pool = new pg.Pool();

export default pool