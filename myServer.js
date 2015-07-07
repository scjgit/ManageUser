var express = require('express');
var config = require('./myConfig.json');
var bodyParser = require('body-parser');

var umsApp = express();

umsApp.use(bodyParser.json());
umsApp.use(bodyParser.urlencoded({ extended: false }));

umsApp.listen(config.port, function(req, res){
	console.log('listening... to port: %s',config.port, config.contextroot);
});

umsApp.use(config.contextroot,express.static(__dirname));

umsApp.use(config.contextroot+'/api', require('./server/api/userApi'));

umsApp.use(function(req, res){
	if(req.path === "/"){
		res.redirect(config.contextroot);
	}
});