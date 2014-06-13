
var userAPI = require('./user');
var uuid = require('node-uuid');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//show forms used to test function
exports.submitform = function(req,res){
	console.log('--------<<<<<Enter Submit form>>>>>---------');
	res.render('form_submit',{});
}

/*User part*/

//register new user (post method): need username, password, email,phone
exports.createNewUser = function(req,res){
	var userDict={userID:uuid.v1(),userInfo:{"name":req.body.username, "email":req.body.email,"password":req.body.password,"phone":req.body.phone},"userStatus":"First Time","uploadPhoneBook":false,"friendList":[]};

	userAPI.userRegister(userDict,
		function(user){
			//if success, reture the user dict json
			console.log('--------<<<<<Register new userRegister successfully>>>>>---------');
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(user));
		},
		function(err){
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify({error:err}));
		}
	);
};

//show all the user in the database
exports.listUsers = function(req, res){
  userAPI.listUsers({},
		function(mems){
			console.log('--------<<<<<Find List of All Users successfully>>>>>---------');
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(mems));
		},
		function(err){
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify({error:err}));
		}
	);
};

//for user login, see if the password is right:need email, password
exports.verifyUser = function(req, res){
  userAPI.verifyUserByEmailPassword(req.body.email, req.body.password,
		function(flag,user){
			console.log('--------<<<<<User Verify Success>>>>>---------');
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify({verified:flag}));
		},
		function(flag){
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify({verified:false}));
		}
	);
};

//user add friend: need userId, friendId
exports.addFriend = function(req, res){
  userAPI.userAddFriend(req.body.userId, req.body.friendId,
		function(user){
			console.log('--------<<<<<User addFriend Success>>>>>---------');
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(user));
		},
		function(flag){
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify({error:err}));
		}
	);
};

//user add friend: need userId, statusString
exports.updataStatus = function(req, res){
  userAPI.userUpdateStatus(req.body.userId, req.body.statusString,
		function(user){
			console.log('--------<<<<<User updataStatus Success>>>>>---------');
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(user));
		},
		function(flag){
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify({error:err}));
		}
	);
};