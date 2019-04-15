var pomelo = require('pomelo');
var app = pomelo.createApp();
app.set('name', 'chatofpomelo-websocket');

app.configure('production|development', 'connector', function () {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
		heartbeat: 10,
	});
});

app.configure('production|development', 'gate', function () {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector, 
		useProtobuf: true
	});
});

app.loadConfig("mysql", app.getBase() + "/config/mysql.json"); // 初始化mysql配置

app.configure('production|development', function () { // 所有服务器都是mysql服务器的一个客户端
	var Helper = require("./app/dao/mysql/mysqlHelper");
	var sqlHelper = new Helper(app);
	app.set("sqlHelper", sqlHelper);
});

app.start();

process.on('uncaughtException', function (err) {
	console.error(' Caught exception: ' + err.stack);
});
