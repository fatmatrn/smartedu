const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User2')

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            user:req.session.userID
        });
        req.flash("success", `${course.name}  has been created successfully`);
        res.status(201).redirect('/courses')
    } catch (error) {
        req.flash("error", "Something happened!");
        res.status(400).redirect('/courses')
    }
}
//MVC  yapisinda view olarak donen version
//get all coursse
exports.getAllCourses = async (req, res) => {
    try {
// Formun method özelliği "GET" olarak belirlenmişse, form verileri URL'nin 
//bir parçası olarak gönderilir. Bu durumda, sunucu tarafından bu verilere 
//erişmek için URL'yi analiz etmek gereklidir.
        const query = req.query.search;

        const categorySlug = req.query.categories;

        const category =await Category.findOne({slug:categorySlug})
        let filter = {};
        if(categorySlug){//bu kontrolu kategorisi olmayan kurslarda gorunsun diye yapiyoruz 
                         //kaldi ki her zaman query olmaya bilir 
            filter={category:category._id}
        }

        
        if(query){
            filter={name:query}
        }
        if(!query && !categorySlug){
            filter.name='',
            filter.category=null
        }

        /*{ $or: [...] }: MongoDB'deki $or operatörü, bir dizi koşuldan 
        en az birinin sağlandığı belgeleri getirmek için kullanılır. Yani,
         ya name koşulu ya da category koşulu sağlanmalıdır.
      { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } }: Bu koşul, 
      name alanı, filtreleme nesnesinin (filter) name özelliği ile eşleşen belgeleri getirir. 
      $regex MongoDB operatörü, düzenli ifade (regex) kullanımına izin verir.
       $options: 'i' ise büyük-küçük harf duyarlılığını kaldırır */

        const courses = await Course.find(
          {  $or:[
                {name:{$regex:'.*'+filter.name+'.*',$options:'i'}},
                {category:filter.category}
            ]}
        ).sort('-createAt').populate('user');
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
        //bir ogrenci isin aldigi kurslar adina anrol button unu gormesini istemiyoruz
        const user = await User.findById(req.session.userID);
        const categories = await Category.find();
        const course = await Course.findOne({slug: req.params.slug}).populate('user');//burada url deki id yi yakaliyoruz
                                                                                      //.populate('user'): ilgili ObjectId ile belirtilmiş kaydın gerçek verilerini getirir<%= course.user.name%>  gibi
                                                                                      //course ile onu olusturan teacher arasi iliskiyi belirttik

        res.status(201).render('course',{//view in icindeki courses.ejs yi render et, ve oraya yakalamis oldugum kurslari gondereceksin
            course,
            user,
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
exports.enrollCourse = async (req, res) => {
    //hangi kurs:body den
    //hangi ogrenci : session dan
    try {
      const user = await User.findById(req.session.userID)
      await user.courses.addToSet({_id:req.body.course_id})
      await user.save();

      res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}
exports.releaseCourse = async (req, res) => {
    //hangi kurs:body den
    //hangi ogrenci : session dan
    try {
      const user = await User.findById(req.session.userID)
      await user.courses.pull({_id:req.body.course_id})
      await user.save();

      res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}
exports.deleteCourse = async (req, res) => {
 
    try {
       await Course.findOneAndRemove({slug:req.params.slug})
       res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}