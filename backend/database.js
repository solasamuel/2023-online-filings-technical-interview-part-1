const mongoose = require('mongoose');

const connectDatabase = () => {
    // developement database connection
    mongoose.connect(process.env.DB_LOCAL_URI).then(conn => {
        console.log(`MongoDB Database connected with HOST: ${conn.connection.host}`);
    })
}

module.exports = connectDatabase;