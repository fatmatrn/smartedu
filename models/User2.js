// kullanici icin model olusturuldu
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:['student','teacher','admin'],
    default:'student'
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
  }],

});

//burada user kaydi yapilmadan once kullanmasi gereken middleware var
// UserSchema.pre('save', function (next) {
//    hangi kullanici giris yapiyorsa onun cagrilmasi ciin this kullanilid
//   const user = this;
//    sifre olusturuldu
//   bcrypt.hash(user.password, 10, (error, hash) => {hata varsa error yoksa hash i donsun
//      kullanicinin sifresi hash olarak tanimlandi
//     user.password = hash;
//     bir sonraki middelaware e gitmesi icin next kullanildi
//     next();
//   });
// });
// UserSchema.pre('save',function(next){
//     const user = this;//o an kullanilacak olan user
//     bcrypt.hash(user.password,10,(error,hash)=>{
//         user.password=hash;
//         next();
//     })
// })


UserSchema.pre('save', function (next) {
    const user = this; // O an kullanılacak olan user

    // Eğer şifre değiştirilmişse veya kullanıcı yeni ise
    if (user.isModified('password') || user.isNew) {
        bcrypt.hash(user.password, 10, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    } else {
        // Şifre değiştirilmemişse next fonksiyonunu doğrudan çağır
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
