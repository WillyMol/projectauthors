/*
Setting up entire Project connecting with database, NVC, deploy in server Heroku.
note you can use: npm install --no-fund <YOUR PACKAGE NAME> to prevent fund messages

npm init -y  => default all parameters to YES inside package.json
set “main” : “server.js”,
Install dependencies
npm i express ejs  express-ejs-layouts
ejs => template language
express-ejs-layouts => Allow to create layouts files for all htmls
npm i --save-dev nodemon => Save as a developing dependency that allow us 
to refresh and restart the server.js everytime we make a change.
In package.json, add these lines:
"scripts" :{
	"start" : "node server.js",
	"devStart" : "nodemon server.js"  => refresh and restart the server.js everytime 
	                                     we make a change.
}
- Setup server => Create server.js file
  Create "routes" folder === routes are called controlers
  Create "models" folder for database models
  This is MVC (models, views, controler=routes)  intruction setup
  Now, when you finish routes, integrate them with views

  To work with database install mongoose
  npm i mongoose
  then install dotenv to load enviroment variables into the application
  npm i --save-dev dotenv
  create a file .env and add enviromental variable for mongoose connection such as:
  DATABASE_URL=mongodb+srv://<user>:<password>@iot-cluster-1iwy8.mongodb.net/<database name>?retryWrites=true&w=majority
 
   Install body-parser to easy access inputs elements from the server 
   npm i body-parser

Setup application with Git and create a file "".gitignore"
and put in there all files you dont want to include in git repository
such as .env and node_modules
type => git init
then type => git add .
then type => git commit -m "initial setup"
then go to GitHub and create a New repository for this project
and select: "...or push an existing repository from command line"
and copy the commands on your terminal

then follow the instruction for Heroku setup on this link minute 20:
https://youtu.be/qj2oDkvc4dQ

To run the server anytime type: npm run devStart


*/
	/* if (process.env.NODE_ENV !== 'production'){
		 require('dotenv').config();		
	} */
	const express = require('express');
	const app = express();
	const expressLayouts = require('express-ejs-layouts');
	const bodyParser = require('body-parser');

	//this a how import the routes index.js into server.js
	const indexRouter = require('./routes/index');
	const authorRouter = require('./routes/authors');


	require ('dotenv/config'); 

	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views'); //  __dirname with double "_" and do not forget to create "views" Folder 
	//app.set('view options', { layout:'layouts/layout.ejs' });
	app.set('layout', 'layouts/layout'); //Another way. All files use this layout
	app.use(expressLayouts); //tell express to use expressLayouts variable above
	app.use(express.static('public')); //do not forget to create "public" Folder
	app.use(bodyParser.urlencoded({limit:'10mb', extended: false}));
	//connect to DB mongoDB
	/* const mongoose = require ('mongoose');
	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser : true, useUnifiedTopology: true});
	const db = mongoose.connection;
	db.on('error', error => console.error(error));
	db.once('open', () => console.log('Connected to MongoDB'));
 */

	//other way to connect to DB mongoDB
	const mongoose = require ('mongoose');
	mongoose.connect(
    	process.env.DATABASE_URL,
    	{ useNewUrlParser: true, useUnifiedTopology: true },
    	() => console.log('connected to DB!')
	);

	app.use('/', indexRouter);
	app.use('/authors', authorRouter);

	app.listen(process.env.PORT || 3000);
	
	
	
	
	
	



























