const mongoose = require('mongoose');

module.exports = () => {
    const connection = {
        // newUrlParser: true,
        useUnifiedTopology: true,
    }

    try{
        mongoose.connect(process.env.DB, connection)
        console.log('Database connected')

    }catch(error){
        console.log('Error:',error.message)
    }
}