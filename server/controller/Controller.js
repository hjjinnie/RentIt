const Controller = {};
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

// create
//userID: order users by descending order and from the top row add 1
Controller.createUser = async (req,res,next) => {
  const password = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
  console.log('controller createuser')
  console.log(req.body);
  // get building id  ${req.body.building}
  const buildingIDQuery = `SELECT id FROM building WHERE address = '${req.body.building}'`
  //initalizae buildingID so you can have access to buildingID further down
  let buildingID;
 try {
    const { rows } = await pool.query(buildingIDQuery);
    buildingID = rows[0]['id'];
  } catch(error) {
    return res.status(400).send(error);
  }

  // insert new user

  const insertQuery = `INSERT INTO
  users(firstname, lastname, building_id, password, email, building_address)
  VALUES($1, $2, $3, $4, $5, $6)
  returning *`;

  const values = [
    req.body.firstname,
    req.body.lastname,
    buildingID,
    password,
    req.body.email,
    req.body.building
  ];

  try {
    const { rows } = await pool.query(insertQuery, values);
    console.log(rows)
    return next();

  } catch(error) {
    console.log(error)
    return res.status(400).send(error);
  }
}

//look for user wiht same username
//use bcrypt compare to check

Controller.createSSID = async (req, res, next) => {
  console.log('createSSID')
  console.log(req.body);
  const passwordQuery = `SELECT password FROM users WHERE email = '${req.body.email}'`
  //initalizae buildingID so you can have access to buildingID further down
  let passwordDB;
 try {
    const { rows } = await pool.query(passwordQuery);
    passwordDB = rows[0]['password'];
    console.log('passwordDB', passwordDB);
  } catch(error) {
    return res.status(400).send(error);
  }

  let bcryptResult = await bcrypt.compare(req.body.password, passwordDB);
  if (!bcryptResult){
      console.log("password doesn not match")
      res.redirect('/signup');
  }else{
    console.log("password matches")
  }
  console.log(req.body.password);

  const userIDQuery = `SELECT user_id FROM users WHERE email = '${req.body.email}'`
  //initalizae buildingID so you can have access to buildingID further down
  let userID;
 try {
    const { rows } = await pool.query(userIDQuery);
    userID = rows[0]['user_id'];
  } catch(error) {
    console.log(userIDQuery);
    console.log(userID);
    console.log('cannot get userid')
    return res.status(400).send(error);
  }

  const rand_token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  res.locals.rand_token = rand_token;
  let addSSID = `INSERT INTO sessions (id,user_id) VALUES ($1, $2) returning *`
  const values = [
    rand_token,
    userID
  ];

  try {
    const { rows } = await pool.query(addSSID, values);
    return next();
  } catch(error) {
    console.log('cannot add SSID')
    return res.status(400).send(error);
  }
}


Controller.setSSIDCookie = (req, res, next) => {
  console.log(res.locals.rand_token);
  console.log("SSID in cookie success");
  res.cookie('ssid', res.locals.rand_token, {httpOnly:true})
  return next();
}

//use when frotend is set up
// Controller.checkCookie = async (req, res) => {
//   const userIDQuery = `SELECT user_id FROM sessions WHERE id = '${req.cookies.ssid}'`
//   //initalizae buildingID so you can have access to buildingID further down
//   let userID;
//  try {
//     const { rows } = await pool.query(userIDQuery);
//     userID = rows[0]['user_id'];
//     res.locals.user = userID;
//     console.log(res.locals.user);
//     return next();
//   } catch(error) {
//     res.redirect('/');
//   }
// }


//only backend testing
Controller.checkCookie = async (req, res, next) => {
  console.log('req.cookie',req.cookies);
  console.log('recookiessid', req.cookies.ssid);
  const userIDQuery = `SELECT user_id FROM sessions WHERE id = '${req.cookies.ssid}'`
  //initalizae buildingID so you can have access to buildingID further down
  console.log(userIDQuery);
  let userID;
 try {
    const { rows } = await pool.query(userIDQuery);
    userID = rows[0]['user_id'];
    console.log('userid',userID);
    res.locals.user = userID;
    console.log(res.locals.user);
    return next();
  } catch(error) {
    res.redirect('/');
  }
}

// get all products
Controller.getAll = async (req,res) => {
  console.log('hello');
  const {email, password} = req.body;
  let productQuery = `SELECT users_b.*, products.* FROM 
  
    users users_a
    INNER JOIN users users_b
    ON users_a.building_id = users_b.building_id
  
    INNER JOIN products
    ON products.owner_id = users_b.user_id
  
    WHERE users_a.user_id= $1`
  try {
    const { rows } = await pool.query(productQuery,[res.locals.user]);
    console.log(rows);
    return res.status(201).send(rows);
  } catch(error) {
    return res.status(400).send(error);
  }
}

Controller.addProduct = async (req, res) => {

  const buildingIDQuery = `SELECT building_id FROM users WHERE user_id = '${res.locals.user}'`
  //initalizae buildingID so you can have access to buildingID further down
  let buildingID;
 try {
    const { rows } = await pool.query(buildingIDQuery);
    console.log(rows[0]['building_id']);
    buildingID = rows[0]['building_id'];
    console.log(buildingID)
  } catch(error) {
    return res.status(400).send(error);
  }

  const {product, price, image, description} = req.body;
  console.log(req.body);
  let productInsert = `INSERT INTO products (product, price_per_day, availability, owner_id, image_url, building_id, description) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`
  let values = [
    product,
    price,
    'yes',
    res.locals.user,
    image,
    buildingID,
    description
  ];
  console.log(values);
  try{
    const { rows } = await pool.query(productInsert, values) 
    // console.log(products)
    // console.log(rows);
    return res.status(201).send(rows);
  } catch (error){
    return res.status(400).send(error);
  }   
}

// update
Controller.update = async (req,res) => {
  console.log(req.body.productID);
  const userIDQuery = `SELECT owner_id FROM products WHERE id = '${req.body.productID}'`
 try {
    const { rows } = await pool.query(userIDQuery);
    console.log(res.locals.user);
    console.log(rows[0]["owner_id"]);
    if (res.locals.user !== Number(rows[0]["owner_id"])){
      return res.status(400).send('You are not authorized to update this product');
    }
  } catch(error) {
    return res.status(400).send(error);
  }
  console.log('onto second query')
  const {product, price, availability, image, description} = req.body;
    const updateProduct =`UPDATE products
      SET product=$1,price_per_day=$2,availability=$3, image_url=$4, description=$5
      WHERE id=${req.body.productID} returning *`;
    console.log(updateProduct);
    let values = [
      product,
      price,
      availability,
      image,
      description
    ];
    try {
      const { rows } = await pool.query(updateProduct, values);
      console.log(rows);
      return res.status(201).send(rows);
    } catch(err) {
      return res.status(400).send(err);
    }
}

// delete
Controller.delete = async (req,res) => {
  const userIDQuery = `SELECT owner_id FROM products WHERE id = '${req.body.productID}'`
  try {
     const { rows } = await pool.query(userIDQuery);
     console.log(res.locals.user);
     console.log(rows[0]["owner_id"]);
     if (res.locals.user !== Number(rows[0]["owner_id"])){
       return res.status(400).send('You are not authorized to delete this product');
     }
   } catch(error) {
     return res.status(400).send(error);
   }
   console.log('onto deleting');
    const deleteQuery = `DELETE FROM products WHERE id= '${req.body.productID}' returning *`;
    console.log(deleteQuery);
    try {
      const { rows } = await pool.query(deleteQuery);
      return res.status(201).send(rows);
    } catch(error) {
      return res.status(400).send(error);
    }
}


//login to console via
//$ psql -U <user> -h<host> <database>
//to quit PostgreSQL command line interface
//<database>=> \q

module.exports = Controller; 