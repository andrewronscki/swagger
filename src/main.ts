import { app } from './app';

import * as http from 'http';
import { MongoHelper } from './mongo.helper';
import * as mongoose from 'mongoose';

const PORT = 8080;
const MONGO_URI = 'mongodb://teste:teste@cluster0-shard-00-00-kbv9a.mongodb.net:27017,cluster0-shard-00-01-kbv9a.mongodb.net:27017,cluster0-shard-00-02-kbv9a.mongodb.net:27017/todo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async () => {
  console.info(`listening on port ${PORT}`);
  mongoose.connect(MONGO_URI, {  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  mongoose.connection.on('open', () => {
    console.info('Connected to Mongo.');
  });
  mongoose.connection.on('error', (err: any) => {
    console.error(err);
  });
});