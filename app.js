const express = require('express')
const app = express();

//Templetate Engine
app.set('view engine', 'ejs');

//Body Parser Middleware
app.use(express.urlencoded({ extended: true }));

//Static Files
app.use(express.static("public"));

//Routes

app.get('/',(req,res)=>{
    res.status(200).render('index',{
        page_name:"index"
    })
});
app.get('/about',(req,res)=>{
    res.status(200).render('about',{
        page_name:"about"
    })
});





//connect  saglandi
//connect  saglandi
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

