module.exports = {
    authCustomer(req, res, next) {
        req.session.reload( function (err) {
            console.log('here authCus', req.session.authUser);
            if (req.session.auth === false) {
          req.session.retUrl = req.originalUrl;
          console.log('here authCus',req.originalUrl );
          return res.redirect('/signin');
        }
        if(req.session.authUser.isadmin === 1)
            return res.redirect('/');
        
        next();
            
        });
        
    },
    authAdmin(req, res, next) {
        console.log(req.session.auth,req.session.authUser);
        if (req.session.auth === false) {
          req.session.retUrl = req.originalUrl;
          return res.redirect('/signin');
        }
        if(req.session.authUser.isadmin === 0)
            return res.redirect('/');
        next();
    }
}   