const User = require("../models/User2");
const Category = require("../models/Category");
const Course= require("../models/Course");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
  

    res.status(201).redirect('/login')
  } catch (error) {
    const errors = validationResult(req);
    for(let i=0; i<errors.array().length; i++){
 req.flash("error", `${errors.array()[i].msg}`);
    }
    
    res.status(201).redirect('/register')

  }
};
exports.LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (user) {
        // sifreleme
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // user sessions
  
            req.session.userID = user._id;
  
            res.status(200).redirect('/users/dashboard');
          } else {
            // eger sifre dogru degilse flash mesaj gosterilmesi saglandi
            req.flash('error', `your password is not correct`);
            res.status(400).redirect('/login');
          }
        });
      } else {
        req.flash('error', `user is not exist`);
        res.status(400).redirect('/login');
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

  exports.logoutUser=(req,res)=>{
    req.session.destroy(()=>{
      res.redirect('/');
  })
}
  exports.getDashboardPage=async (req,res)=>{
  
    const user = await User.findOne({_id:req.session.userID}).populate('courses')
    const categories = await Category.find()
    const courses = await Course.find({user:req.session.userID})

      res.status(200).render('dashboard',{
        page_name:'dashboard',
        user,//template ye gondermis oluyoruz
        categories,courses
      })

}