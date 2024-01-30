const mongoose = require('mongoose');
require('dotenv/config');
mongoose.connect(process.env.CONN_URI)
.then((x) => {
    console.log(`Sccessfully connected to MongoDB Database name: "${x.connections[0].name}"`);
})
.catch((err) => {
    console.error(`MongoDB connection error.`)
});

module.exports = mongoose;