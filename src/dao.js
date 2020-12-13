const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/pincode', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', function (err) { throw err }); 

db.once('open', function() {
   console.log('mongoose db connected!')
}); 

module.exports=db;