const User = require("../models/User2");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
   
      if (user) {
        // sifreleme
        const same = await bcrypt.compare(password, user.password);

        if (same) {
          // Kullanıcı oturumu(User Session)
         req.session.userID=user._id;


          res.status(200).redirect('/users/dashboard');
        } 
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
  
    const user = await User.findOne({_id:req.session.userID})
      res.status(200).render('dashboard',{
        page_name:'dashboard',
        user//template ye gondermis oluyoruz
      })

}