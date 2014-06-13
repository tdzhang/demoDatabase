require('./mongooseModel.js');
//get cryptograph object
var crypto = require('crypto');

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//接口部分

//用userId找回user
//callback_func(user)
//err_func(err_String)
exports.findUserByUserId=function(id_request,callback_func,err_func){
	if (connected) {
		userModel.findOne({userID:id_request},function(err,user){
			if (err) {
				//if err, call err_func
				console.log('findUserByUserId error');
				err_func("findUserByUserId error");
			}
			else{
				//if fetch success, call callback_func
				console.log('findUserByUserId success');
				callback_func(user)
			}
		});
	}
	else{
		console.log('the connection to db is not ready');
		err_func("findUserByUserId connection error");
	}
};


//用 email 和 password verify 用户
//callback_func(flag,user)
//err_func(err_String)
exports.verifyUserByEmailPassword=function(email_request,password_request,callback_func,err_func){
	if (connected) {
		var password_request_hashed=crypto.createHash('md5').update(password_request).digest("hex").toString();
		userModel.findOne({"userInfo.email":email_request},function(err,user){
			if (err) {
				//if err, call err_func
				console.log('verifyUserByEmailPassword error');
				err_func("verifyUserByEmailPassword error");
			}
			else{
				//if fetch success, call callback_func
				console.log('verifyUserByEmailPassword...');
				console.log(user);
				console.log(user.userInfo.password);
				console.log(password_request_hashed);
				if (user && (user.userInfo.password == password_request_hashed)) {
					console.log('find user and password passed');
					callback_func(true,user);
				}
				else{
					console.log('Didnot find user or password fail');
					callback_func(false);
				}
				
			}
		});
	}
	else{
		console.log('the connection to db is not ready');
		err_func("verifyUserByEmailPassword connection error");
	}
};


//注册 user
//callback_func(userDict)
//err_func(err_String)
exports.userRegister=function(userDict,callback_func,err_func){
  if (connected) {
  	userModel.find({"userInfo.email":userDict.userInfo.email},function(err,users){
			if (err) {
				//if err, call err_func
				//console.log('memberRegister findMemberByAccName error');
				err_func("userRegister error when communicate with database");
			}
			else{
				//if accountName not exist in the database, start register
				if (users.length==0) {
					var userDict_hashed=userDict;
				  	userDict_hashed.userInfo.password=crypto.createHash('md5').update(userDict.userInfo.password).digest("hex").toString();
				  	var user = new userModel(userDict_hashed);
					console.log(user.userInfo.name+" created.");
					user.save(function(err,user){
						if (err) {
							console.log(user.userInfo.name+' not successfully insert.');
							err_func(user.userInfo.name+' not successfully insert.');
						}
						else{
							console.log(user.userInfo.name+' is: successfully inserted.');
							callback_func(userDict);
						}
					});
				}
				else{
					err_func("Email Already Exist");
				}
			}
		});
  }
  else{
  	console.log('the connection to db is not ready');
	err_func("user Register connection error");
  }
};

//add fiend to user: using friend_id
exports.userAddFriend=function(user_id,friend_id,callback_func,err_func){
  if (connected) {
		userModel.findOne({userID:user_id},function(err,user){
			if (err) {
				//if err, call err_func
				console.log('userAddFriend error');
				err_func("userAddFriend error");
			}
			else{
				//if fetch success, call callback_func
				console.log('userAddFriend step 1 success');
				userObj=user.toObject();
				delete userObj['_id'];
				userObj.friendList.push(friend_id);
				//start update
				userModel.findOneAndUpdate({userID:user_id},userObj,function(err,user){
					if (err) {
						//if err, call err_func
						console.log('userAddFriend error2');
						console.log(err);
						err_func("userAddFriend error2");
					}
					else{
						//if fetch success, call callback_func
						console.log('userAddFriend success');
						callback_func(user)
					}
				});
			}
		});
	}
	else{
		console.log('the connection to db is not ready');
		err_func("userAddFriend connection error");
	}
};

//update user's status: using statusString
exports.userUpdateStatus=function(user_id,statusString,callback_func,err_func){
  if (connected) {
		userModel.findOne({userID:user_id},function(err,user){
			if (err) {
				//if err, call err_func
				console.log('userUpdateStatus error');
				err_func("userUpdateStatus error");
			}
			else{
				//if fetch success, call callback_func
				console.log('userUpdateStatus step 1 success');
				userObj=user.toObject();
				delete userObj['_id'];
				userObj.userStatus=statusString;
				//start update
				userModel.findOneAndUpdate({userID:user_id},userObj,function(err,user){
					if (err) {
						//if err, call err_func
						console.log('userUpdateStatus error2');
						console.log(err);
						err_func("userUpdateStatus error2");
					}
					else{
						//if fetch success, call callback_func
						console.log('userUpdateStatus success');
						callback_func(user)
					}
				});
			}
		});
	}
	else{
		console.log('the connection to db is not ready');
		err_func("userUpdateStatus connection error");
	}
};

//test use only ---------------------
exports.listUsers=function(mid_request,callback_func,err_func){
	if (connected) {
		userModel.find({},function(err,members){
			if (err) {
				//if err, call err_func
				console.log('listUsers error');
				err_func("listUsers error");
			}
			else{
				//if fetch success, call callback_func
				console.log('listUsers success');
				callback_func(members)
			}
		});
	}
	else{
		console.log('the connection to db is not ready');
		err_func("listUsers connection error");
	}
};