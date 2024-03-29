// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const MongoURI = process.env.MONGO_URL;

const connect = () => {
    mongoose.connect(MongoURI);
    console.log('Connected to database.');
}

// module.exports = connect; 
export default connect;