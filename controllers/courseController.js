const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);

        res.status(201).json({
            status: 'success',
            course
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}
//MVC  yapisinda view olarak donen version
//get all coursse
exports.getAllCourses = async (req, res) => {
    try {

        const categorySlug = req.query.categories;

        const category =await Category.findOne({slug:categorySlug})
        let filter = {};
        if(categorySlug){//bu kontrolu kategorisi olmayan kurslarda gorunsun diye yapiyoruz 
                         //kaldi ki her zaman query olmaya bilir 
            filter={category:category._id}
        }

        const courses = await Course.find(filter);
        const categories = await Category.find();


        res.status(201).render('courses',{//view in icindeki courses.ejs yi render et, ve oraya yakalamis oldugum kurslari gondereceksin
            courses,
            categories,
            page_name:'courses'//ayrica view e bir page_name gondererek tiklandiginda active ye sahip olacak  olan sayfayi belirlemis oluyoruz
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

//json donen version
// exports.getAllCourse = async (req, res) => {
//     try {
//         const courses = await Course.find(req.body);

//         res.status(201).json({
//             status: 'success',
//             courses
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             error
//         });
//     }
// }

//get a courses
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({slug: req.params.slug});//burada url deki id yi yakaliyoruz

        res.status(201).render('course',{//view in icindeki courses.ejs yi render et, ve oraya yakalamis oldugum kurslari gondereceksin
            course,
            page_name:'courses'//ayrica view e bir page_name gondererek tiklandiginda active ye sahip olacak  olan sayfayi belirlemis oluyoruz
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}