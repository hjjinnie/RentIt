const rentController = {};
const pg = require('pg');

// get all users with the same building_id as the current user
// join with all products from those users
//only once you connect, can you run client.query

const conString = "postgres://nalflrci:zHF3c2rUkZTXNubs_3fmoIlOfF_fOyB2@drona.db.elephantsql.com:5432/nalflrci" //Can be found in the Details page




//access username and password in url string via req.query
rentController.getProducts = async (req, res, next) => {
    console.log(req)
    console.log(req.body)
    const client = new pg.Client(conString);
    await client.connect()
    const {username, password} = req.body;
    let sql = `SELECT products.* FROM users users_a
    INNER JOIN users users_b
    ON users_a.building_id = users_b.building_id
    INNER JOIN products
    ON products.renter_id = users_b.user_id
    WHERE users_a.firstname = $1 AND users_a.password= $2`
    await client.query(sql,[username,password]) 
        .then((resp) => {
            res.locals.products=resp.rows
            return next()})
            .catch((err) => {
                return next(err);
            })
    //fix db

}

//how to add url to an state array in react
rentController.addProducts = (req, res, next) => {
    const {product,price} = req.body;
    let sql = `INSERT INTO products (product, price_per_day) VALUES ($1, $2)`
    
    client.query(sql, [product, price]) 
        .then((products) => {
            res.locals.products=products.rows[0]
            return next()})
            .catch((err) => {
                return next(err);
            })
}

 module.exports = rentController;