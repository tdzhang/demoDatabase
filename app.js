
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//interface url
//debug use
app.get('/submitform',routes.submitform);

//api
app.get('/', routes.index);
app.post('/registerNewUser',routes.createNewUser); //create new user
app.post('/userLogin',routes.verifyUser); //user login
app.get('/listAllUsers',routes.listUsers); //show all the users in the database
app.post('/addFriend',routes.addFriend); //user add Friend
app.post('/updataStatus',routes.updataStatus); //user updata it's status

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
