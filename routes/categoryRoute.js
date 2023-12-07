const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.route('/').post(categoryController.createCourse);  


module.exports=router;