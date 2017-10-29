const restify = require('restify');
const builder = require('botbuilder');
const DB = require('./MongoInterface');

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
	console.log(`${server.name} listening to ${server.url}`);
});

let mongo = new DB();

let connector = new builder.ChatConnector({
	appId: '22c1ba29-61c8-4be1-ab68-1fdd1ab627cf',
	appPassword: 'iFD1HuaBL6xbgj0GqCnzwDd'
});

server.post('/api/messages', connector.listen());

let bot = new builder.UniversalBot(connector, (session) => {
	session.send('starting');
	mongo.find('users', { "userId": session.message.user.id }, (result) => {
		if(result.length === 0) {
			mongo.insert('users', {
				userId: session.message.user.id,
				addressHandler: session.message.address
			});
		}
	});
	// MongoClient.connect('mongodb://localhost:27017/botDb', (err, db) => {
	// 	assert.equal(null, err);
	// 	DB.insert(db, assert, session, 'users', session.message.address, () => {
	// 		session.send('heyyyyyyy');
	// 		db.close();
	// 	});

	// });
	session.beginDialog('echo');
});

bot.dialog('echo', [
	(session) => {
		session.endConversation('Bye ' + session.message.user.name);
	}
]);