const MongoClient = require('mongodb').MongoClient;
const Address = 'mongodb://localhost:27017/botDb';

module.exports = class DB {
	insert(collName, object) {
		MongoClient.connect(Address, (err, db) => {
			db.collection(collName).insertOne(object, (err, result) => {
				if (err) throw err;
				db.close();
			});
		});
	}
	insertMany(collName, object) {
		MongoClient.connect(Address, (err, db) => {
			db.collection(collName).insertMany(object, (err, res) => {
				if (err) throw err;
				db.close();
			});
		});
	}
	async findOne(collName, condition, callback) {
		let lresult;
		await MongoClient.connect(Address, (err, db) => {
			if (err) throw err;
			db.collection(collName).findOne(condition, (err, result) => {
				if (err) throw err;
				db.close();
				callback(result);
			});
		});
	}
	async find(collName, condition, callback) {
		let lresult;
		await MongoClient.connect(Address, (err, db) => {
			if (err) throw err;
			db.collection(collName).find(condition).toArray((err, result) => {
				if(err) throw err;
				db.close();
				callback(result);
			});
		});
	}
};