const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/environment');

// eslint-disable-next-line max-len
const mongoUri = `mongodb://localhost:27017/players`; //&replicaSet=globaldb`;

function connect() {
 mongoose.set('debug', true);
 return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
  connect,
  mongoose
};
