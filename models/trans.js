const mongoose = require('mongoose')

var cs = process.env.MONGO_CONNECTION_STRING || '';
mongoose.connect(cs,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
var db = mongoose.connection;
db.on('connected', function() {
console.log("Trans Successfully connected to MongoDB!");
});

db.on('error',function(err){
    console.log('Trans connect error:'+err);
})
db.on('disconnected',function(){
    console.log('Trans disconnected');
})

const transSchema = mongoose.Schema({
    transID:{
        type:String,
        unique:true,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    
    bid:{
        type:Number,
        required:true
    }
})

const transModel = mongoose.model('trans_data',transSchema)
module.exports = transModel