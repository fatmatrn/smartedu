const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug:{
    type: String,
    unique: true,
  },
});

//Asagida neden arrow function degilde normal function kullandik?
/*
Arrow function ile normal function arasındaki temel fark, this anahtar kelimesinin nasıl kullanıldığında ve yürütme bağlamında bulunur.

Arrow function, this anahtar kelimesinin üstteki kapsamında bağlanmasını sağlar. Yani, bir arrow function içindeki this, fonksiyonun tanımlandığı yerdeki this 'e başvurur.

Buna karşılık, normal function, this anahtar kelimesinin kendi yürütme bağlamında bağlanmasını sağlar. Bu nedenle, normal bir function içindeki this, fonksiyonun çağrıldığı yerdeki this 'e başvurur.
*/

CategorySchema.pre('validate',function(next){//pre()  veri tabanina dokumant i kaydetmeden olusturmayi saglar
  this.slug=slugify(this.name,{//bu  modelin name sini slug a cevirecek
    lower:true,
    strict:true
  })
  next();
})

const Category = mongoose.model('Category',CategorySchema)
module.exports=Category;
