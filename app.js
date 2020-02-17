//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
const busboy = require("then-busboy");
const fileUpload = require('express-fileupload');

const app = express();

//use for uploading file
app.use(fileUpload());
//session
var session = require('express-session');

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/vendor',express.static(__dirname + '/public'));
 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true

}));
//hbs.registerPartials(__dirname + 'views');
//mysql connection
var conn = require('./js/conn.js');
//for links
var routes = require('./js/routes.js');
//for queries to database
var post = require('./js/post.js');
//for responses
var responses = require('./js/response.js');
//for delete
var deleting = require('./js/delete.js');
//for update 
var update = require('./js/update.js');
//for inserting data to database
var insert = require('./js/inserts.js');

app.use('/', insert);
app.use('/', update);
app.use('/', deleting);
app.use('/', responses);
app.use('/', routes);
app.use('/', post);

//server listening
app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
