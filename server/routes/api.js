const express = require('express');
const rentController = require('../controllers/rentController');
const router = express.Router();


//dummy check
router.post('/',
  (req, res) => res.status(200).json(res.locals.data)
);

//redirect to products?
// express.json() is middleware that processes all "json" data and puts the parsed data into request.body
//espress.json converts into json allowing username and password to be accessible in req.body
router.post('/products',
  express.json(),
  rentController.getProducts,
  (req, res) => res.status(200).json(res.locals.products)
);

// router.post('/products', rentController.addProduct, 
// (req, res) => res.status(200).json(res.locals.products)
// );
//checks if firstname and password and looks for building ID to show products
//be able to post items for rent;

module.exports = router;