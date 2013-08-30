# curry-di

Similar to the standard curry function found in functional programming but allowing parameters to applied non-sequentially based on names matching a supplied object.

The primary purpose of this library is so you can use function parameters to include dependencies of that function and later normalize them into a standard form.

## An Example

##### routes/user.js

	module.exports.register = function(err, req, res, bcrypt, emailSender, db, next) { }
	module.exports.login = function(err, req, res, memcache, db, next) { }
	
##### app.js
    
	var curryDi = require('curry-di');
	var dependencies = {
		emailSender: var emailSender = curry(require('email-sender'))('localhost'),
		bcrypt: require('bcrypt'),
		db: db,
		memcacheApi: memcacheApi
	};
	
	// The return value of curryDi(dependencies, ...) is a function with the
	// signature function(err, req, res, next) as all other parameters have 
	// been matched to the dependences object.
	app.post('/user/register', curryDi(dependencies, userRoute.register));
	app.post('/user/login', curryDi(dependencies, userRoute.login));
