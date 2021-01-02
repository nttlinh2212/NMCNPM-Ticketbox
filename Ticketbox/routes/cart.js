const express = require('express');
const cartModel = require('../models/cart');


const router = express.Router();

// router.get('/', async function (req, res) {
//   const items = [];
//   for (const ci of req.session.cart) {
//     const product = await productModel.single(ci.id);
//     items.push({
//       product,
//       quantity: ci.quantity,
//       amount: product.Price * ci.quantity
//     })
//   }

//   res.render('vwCart/index', {
//     items,
//     empty: items.length === 0
//   });
// })


///add?idshowtime=30000&idrow=1&idcolumn=3
router.get('/add', async function(req, res) {
        console.log(req.query);
        const item = {
            idshowtime: +req.query.idshowtime,
            idrow: +req.query.idrow,
            idcolumn: +req.query.idcolumn
        }

        result = await cartModel.add(req.session.cart, item);
        console.log(req.session.cart);
        res.json(result); //1:thanhcong 0:da co trong cart -1: unavailable
    })
    // /remove?idshowtime=30000&idrow=1&idcolumn=3
router.get('/remove', function(req, res) {
        console.log(req.query);
        const item = {
            idshowtime: +req.query.idshowtime,
            idrow: +req.query.idrow,
            idcolumn: +req.query.idcolumn
        }
        result = cartModel.remove(req.session.cart, item)

        res.json(result);

    })
    // /checkout?idcus=10003 return list check list[0] = false thi co ghe ko available va cancel book
    // in ra list[1] = row list[2]= column of unavailableseat
    //if list[0] = true thi book thanh cong tat ca cac seat in cart va return list[1] la so seat da book thanh cong
router.get('/checkout', async function(req, res) {
    count = 0;
    for (const ci of req.session.cart) {
        if(await cartModel.isAvailableASeat(ci.idshowtime, ci.idrow, ci.idcolumn)=== null)
            res.json([false,ci.idrow, ci.idcolumn]);
    }
    for (const ci of req.session.cart) {
        result = await cartModel.bookASeat(ci.idshowtime, ci.idrow, ci.idcolumn, req.query.idcus);
        if (result)
            count++;
        console.log("result" + result);
    }
    req.session.cart = [];
    res.json([true,count]); //number of ticket booked succesfully
})

module.exports = router;