var controllers = require('../controllers/server.controller.js');

module.exports = function (app) {
    app.route('/test').get(controllers.test);
    app.route('/domainSignUp').post(controllers.createSubdomains);
    app.route('/userSubscribeDetails').post(function(req,res){
        res.send('success');
    });
};
