const express = require('express')
const pageController = require('../controllers/pageController')
const redirectMiddleware = require('../middlewares/redirectMiddleware')

const router = express.Router()

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage)
router.route('/login').get(redirectMiddleware,pageController.getLoginPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendEmail)
//login yada reguister in url sine ulasmaya calisildiginda zaten hali hazirda login bir user varsa engel olan bir middle ware kullanmis olduk
//mu middleware yi anonim function olarak olusturdugumuzda direct module nin adi ile cagirmis olduk ve anonim function otomatik olarak calisti


module.exports=router;