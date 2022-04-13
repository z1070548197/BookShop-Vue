const mongoose = require('mongoose');
let db = require('../config/keys');
module.exports = mongoose
    .connect(db.mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongodb Connected...');
    })
    .catch(err => {
        console.log(err);
    })