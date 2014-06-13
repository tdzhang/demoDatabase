//连接mongodb数据库部分
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/first');
mongoose.connect('mongodb://username:password@database_domain_name');
var db = mongoose.connection;
connected=false;

 //建立schema和model of user
var userSchema = mongoose.Schema({
    userID:String,
	userInfo:{name:String, email:String, password:String, phone:String},
	userStatus:String,
	uploadPhoneBook:Boolean,
	friendList:[String],
});

userModel = mongoose.model('user', userSchema);

//建立error handling
if(!connected){
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  console.log('mongodb connected');
	  connected=true;
	});
}
