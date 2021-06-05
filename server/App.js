const express= require('express');
const app= express();

const morgan= require('morgan');
const cors= require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const checkAuth=require('./middlewares/check-auth');

mongoose.connect('mongodb://127.0.0.1:27017/videoServer',{
useCreateIndex:true,
useNewUrlParser:true,
useUnifiedTopology:true
});
 mongoose.Promise= global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extened:false}));
app.use(bodyParser.json());

// To make uploads folder publically available with '/api/videos' route
app.use('/api/videos', express.static('media/uploads'));

app.use('/api/signUp',require('./router/signUp'));
app.use('/api/signIn',require('./router/signIn'));
app.use('/api/upload',checkAuth,require('./router/upload'));
app.use('/api/videoList', checkAuth, require('./router/videoList'));


module.exports=app; 