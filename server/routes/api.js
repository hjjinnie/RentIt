const express = require('express');
const Controller = require('../controller/Controller');
const router = express.Router();


router.get('/',(req,res) => {
  res.status(200);
})

//login
router.post('/', Controller.createSSID, Controller.setSSIDCookie, (req, res) => {
  res.status(200).send("login successful");
});

//sigup
router.post('/signup', Controller.createUser, Controller.createSSID, Controller.setSSIDCookie, (req, res) => {
  res.status(200).send("signup successful");
});

//homepage
router.get('/homepage', Controller.checkCookie, Controller.getAll);

//addproduct
router.post('/homepage', Controller.checkCookie, Controller.addProduct);

//update product
router.put('/homepage', Controller.checkCookie, Controller.update);

//delete product
router.delete('/homepage', Controller.checkCookie, Controller.delete);


//redirect to products?
// express.json() is middleware that processes all "json" data and puts the parsed data into request.body
//espress.json converts into json allowing username and password to be accessible in req.body
// router.post('/products',
//   express.json(),
//   rentController.getProducts,
//   (req, res) => res.status(200).json(res.locals.products)
// );

// router.post('/products', rentController.addProduct, 
// (req, res) => res.status(200).json(res.locals.products)
// );
//checks if firstname and password and looks for building ID to show products
//be able to post items for rent;

module.exports = router;