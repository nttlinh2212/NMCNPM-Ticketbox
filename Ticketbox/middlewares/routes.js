const {authCustomer,authAdmin} = require('../middlewares/auth');
module.exports = function(app){
    app.use('/', require('../routes/guest'));
    app.use('/customer/',authCustomer, require('../routes/customer'));
    app.use('/customer/cart',authCustomer, require('../routes/cart'));
    app.use('/admin/', authAdmin,require('../routes/admin/index'));
    app.use('/admin/film',authAdmin, require('../routes/admin/film'));
    app.use('/admin/account',authAdmin, require('../routes/admin/account'));
    //app.use('/admin/report', require('../routes/admin/report'));
    app.use('/admin/showtime', authAdmin, require('../routes/admin/showtime'));
    app.use('/admin/theater',authAdmin, require('../routes/admin/theater'));
    app.use('/admin/report',authAdmin, require('../routes/admin/report'));

    // catch 404 and forward to error handler
    app.use(function(req, res) {
    //next(createError(404));
    res.render('404');
    });

    // error handler
    app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('505');
    });
}