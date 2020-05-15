const AuthController = {};
const bcrypt = require('bcryptjs')
const pg = require('pg');
const SALT_WORK_FACTOR = 10;

const pool = new pg.Pool({
user: 'nalflrci',
host: 'drona.db.elephantsql.com',
database: 'nalflrci',
password: 'n-uSmE2jMOnrtqEcrFHZ4ce8pLDf1ed6',
port: '5432'});

pool.on('connect', ()=>{
  console.log('connected to the db');
})




module.exports = AuthController; 