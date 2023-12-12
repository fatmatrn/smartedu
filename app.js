const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')


const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Connected!'));


//Templetate Engine
app.set('view engine', 'ejs');

//Global variable

global.userIN=null;


// Middleware

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'keyboard cat',
  resave: false,//herhangi bir degisiklik olmasa da kaydetmeyi zorunlu kiliyor
  saveUninitialized: true,
  //cookie: { secure: true }   1.5   ten sonra zounlu olmadigindan kullamiytoruz
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}))

//Static Files
app.use(express.static("public"));

//Routes
app.use('*',(req,res,next)=>{
  userIN=req.session.userID;
  next();
})
/* '*' ifadesi, tüm rotaları kapsayan bir yol ifadesidir. Yani, bu middleware, uygulamaya gelen herhangi bir istekte çalışacaktır.
Middleware fonksiyonu şu işlemleri gerçekleştirir:
req.session.userID değerini userIN değişkenine atar. Bu, oturum (session) üzerindeki kullanıcı kimliğini (userID) alarak başka yerlerde bu değeri kullanabilmenizi sağlar.
Ardından next() fonksiyonunu çağırır. next() fonksiyonu, middleware'den sonraki middleware'e veya route işlevine geçişi sağlar. Bu sayede middleware zinciri devam eder ve diğer işlemler gerçekleştirilir.*/
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);





//connect  saglandi
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

/*
1.adim:Controllerde yonlendirme sirasinda cagiracagimiz methodu yaziyoruz
2.adim:Route  gecip yonlendirmeyi yaziyoruz
3.adim:Ilgili template yi olusturuyoruz
*/

