/*
Setting up entire Project connecting with database, NVC, deploy in server Heroku.

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
  when do routes, integrate them with views

  To work with database install mongoose
  npm i mongoose
  then install dotenv to load enviroment variables into the application
  npm i --save-dev dotenv
  create a file .env

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


*/
	if (process.env.NODE_ENV !== 'production'){
		//require('dotenv').load();
		require('dotenv').parse();
		//Use .parse() instead
	}
	const express = require('express');
	const app = express();
	const expressLayouts = require('express-ejs-layouts');
	//this a how import the routes index.js into server.js
	const indexRouter = require('./routes/index'); 

	app.set('view engine', 'ejs');
	app.set('views', _dirname + '/views'); // do not forget to create "views" Folder 
	app.set('layout', 'layouts/layout'); //All files use this layout
	app.set(expressLayouts); //tell express to use expressLayouts variable above
	app.use(express.static('public')); //do not forget to create "public" Folder
	
	const mongoose = require ('mongoose');
	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser : true});
	const db = mongoose.connection;
	db.on('error', error => console.error(error));
	db.once('open', () => console.log('Connected to Mongoose'));

	app.use('/', indexRouter);

	app.listen(process.env.PORT || 3000);
	
	
	
	
	
	



























