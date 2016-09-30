'use strict';
var path = require('path'),
        fs = require('fs');

exports.test = function(req,res){
   console.log('req reached');
   res.send('success');
};
exports.createSubdomains = function (req, res) {

    if (!fs.existsSync('./sub_domain/' + req.body.domainName)) {
        fs.mkdirSync('./sub_domain/' + req.body.domainName, '0777');
    }
    var firstData = "var serviceworker = '52.66.161.106:8080/sub_domain/" + req.body.domainName + "/service-worker.js';\n";

    fs.writeFile('./sub_domain/' + req.body.domainName + '/generatedScript.js', firstData, function (err) {
        if (err) {
            return console.log(err);
        }
        fs.createReadStream('./app/workerscript/service-worker.js').pipe(fs.createWriteStream('./sub_domain/' + req.body.domainName + '/service-worker.js'));
        fs.createReadStream('./app/workerscript/generatedScript.js').pipe(fs.createWriteStream('./sub_domain/' + req.body.domainName + '/generatedScript.js', {'flags': 'a'}));
        res.send({message: 'success', file:'52.66.161.106:8080/sub_domain/' + req.body.domainName + '/generatedScript.js'});
    });

};
