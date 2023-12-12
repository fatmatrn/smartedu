const User = require('../models/User2')


    

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID).exec();

    if (!user) {
      return res.redirect('/login');
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      error: 'Server Error',
    });
  }
};

// User.findById(req.session.userID,(err,user)=>{
//     if(err ||  !user)  return  res.redirect('login')
//     next();
// })

