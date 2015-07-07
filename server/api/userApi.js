
var users = require('../db/users');

var express = require('express');
var router = express.Router();

/**Getting all users from Db**/
router.get("/users", function(req, res, next) {
    //console.log('In get Users');
    users.getUsers().then(function(data){
    	res.json(data);
    });
    
});

/**Inserting a users to Db**/
router.post("/user", function(req, res, next) {
    //console.log('In post/save User');
    users.addUser(req.body).then(function(data){
    	res.status(201).json(data);
    });
    
});

/**Getting a user from Db**/
router.get("/users/:userId", function(req, res, next) {
    //console.log('In get User by id ');
    users.getUser(req.params.userId).then(function(data){
    	res.json(data);
    });
});

/**Updating a user in Db**/
router.put("/users/:userId", function(req, res, next) {
    //console.log('In update User by id ');
    users.updateUser(req.body).then(function(data){
    	res.json(data);
    });
});

/**Deleting a user from Db**/
router.delete("/users/:userId", function(req, res, next) {
    //console.log('In delete User by id ');
    users.deleteUser(req.params.userId).then(function(data){
    	res.json(data);
    });
});

module.exports = router;
