const express = require('express')
const pageRoute = require('./routes/pageRoute')


const app = express();


//Templetate Engine
app.set('view engine', 'ejs');

//Body Parser Middleware
app.use(express.urlencoded({ extended: true }));

//Static Files
app.use(express.static("public"));

//Routes

app.use('/',pageRoute);





//connect  saglandi
//connect  saglandi
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

