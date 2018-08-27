const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const fs = require("fs");
const koaBody = require("koa-body");

// $ GET /package.json
app.use(serve('../client'));

//登陆模块 signin()
router.get('/signin', async (ctx) => {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '661475chen',
		database: 'my_db'
	});


	connection.connect(function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});


	var response = {
		"name": ctx.query.name,
		"password": ctx.query.password
	};

	var addSql = 'SELECT * FROM ArthurSlogAccount WHERE AccountName=?';
	var addSqlParams = [response.name];

	var datas = await new Promise((resolve, reject) => {

		connection.query(addSql, addSqlParams, function (err, result) {
			if (err) {
				reject(err);
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			if (result[0].Password == response.password) {
				resolve(result[0]);
				console.log('Welcome~ SingIn Successul ^_^' + '\\' + 'Level: ' + result[0].Level + ' Houses: ' + result[0].Houses);
			}
			if (result[0].Password != response.password) {
				reject('SingIn Fault ^_^!');
				console.log('SingIn Fault ^_^!');
			}
		});
	});
	
	if(datas){
		ctx.body = datas;
	}
	connection.end();
});

//注册模块 signup() 
router.get('/signup', async (ctx) => {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '661475chen',
		database: 'my_db'
	});


	connection.connect(function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});


	var response = {
		"name": ctx.query.name,
		"password": ctx.query.password,
		"firstname": ctx.query.firstname,
		"lastname": ctx.query.lastname,
		"birthday": ctx.query.birthday,
		"sex": ctx.query.sex,
		"age": ctx.query.age,
		"wechart": ctx.query.wechart,
		"qq": ctx.query.qq,
		"email": ctx.query.email,
		"contury": ctx.query.contury,
		"address": ctx.query.address,
		"phone": ctx.query.phone,
		"websize": ctx.query.websize,
		"github": ctx.query.github,
		"bio": ctx.query.bio
	};

	var addSql = 'INSERT INTO ArthurSlogAccount(AccountName, Password, Firstname, Lastname, Birthday, Sex, Age, Wechart, Qq, Email, Contury, Address, Phone, Websize, Github, Bio) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	var addSqlParams = [response.name, response.password, response.firstname, response.lastname, response.birthday, response.sex, response.age, response.wechart, response.qq, response.email, response.contury, response.address, response.phone, response.websize, response.github, response.bio];



	ctx.body = await new Promise((resolve, reject) => {

		connection.query(addSql, addSqlParams, function (err, result) {
			if (err) {
				reject(err);
				console.log('[INSERT ERROR] - ', err.message);
				return;
			}
			resolve('Singup Successful!');
		});
	});
	connection.end();
});

router.post('/uploadfiles', koaBody({multipart: true}), async (ctx) => {
	console.log('fields: ', ctx.request.fields);
	console.log('files: ', ctx.request.files);

	const file = ctx.request.files.myFile;
	const reader = fs.createReadStream(file.path);
	const stream = fs.createWriteStream('TracyWorld_icon' + '.jpg');
	reader.pipe(stream);
});

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
