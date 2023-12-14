
//mu middleware yi anonim function olarak olusturdugumuzda direct module nin adi ile cagirabiliyoruz

module.exports = async (req, res, next) => {
  try {
  if(req.session.userID){
    return res.redirect('/')
  }
  //Bu middle ware login kullanicinin olmasi durumunda anasayfaya yonlendirir

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      error: 'Server Error',
    });
  }
};