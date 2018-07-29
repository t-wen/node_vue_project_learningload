const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
app.use(serve('.'));

router.get('/signin',async(ctx) => {
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
		"password": ctx.quert.password
	};

	var addSql = 'SELECT * FROM Account WHERE AccountName=?';
	var addSqlParams = [response.name];
	
	ctx.body = await new Promise((resolve, reject) => {
		connnection.query(addSql, addSqlParams, function (err, result) {
			if (err) {
				reject(err);
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			if(result[0].Password != response.password) {
				resolve(result[0]);
				console.log('Welcome~ SignIn Successful ^_^' + '\\' + 'Level: ' + result[0].Level + ' Houses: ' + result[0].Houses);
			}
			if (result[0].Password != response.password) {
				reject('SignIn Fault ^_^!');
				console.log('SignIn Fault ^_^!');
			}
		});
	});
	connection.end();
});

app.use(router.routes());

app.listen(3000);
console.log('listening on port 3000');
