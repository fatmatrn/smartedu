const express = require('express')
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')


const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1/smartedu-db',{
// useNewUrlParser:true,
// useUnifiedTopology:true,
// useFindAndModify:false,
// useCreateIndex:true
}).then(()=>{
    console.log('DB Connected Successfuly')
});


//Templetate Engine
app.set('view engine', 'ejs');

//Body Parser Middleware
app.use(express.urlencoded({ extended: true }));

//Static Files
app.use(express.static("public"));

//Routes

app.use('/',pageRoute);
app.use('/courses',courseRoute);





//connect  saglandi
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

