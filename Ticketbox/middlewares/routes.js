module.exports = function(app){
    app.use('/', require('../routes/guest'));
    app.use('/customer/', require('../routes/customer'));
    app.use('/admin/', require('../routes/admin/index'));
    app.use('/admin/film', require('../routes/admin/film'));
    app.use('/admin/account', require('../routes/admin/account'));
    //app.use('/admin/report', require('../routes/admin/report'));
    app.use('/admin/showtime', require('../routes/admin/showtime'));
    app.use('/admin/theater', require('../routes/admin/theater'));

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