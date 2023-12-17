const nodemailer = require("nodemailer");

exports.getIndexPage=(req,res)=>{
    console.log(req.session.userID);
    res.status(200).render('index',{
        page_name:"index"
    })
};

exports.getAboutPage=(req,res)=>{
    res.status(200).render('about',{
        page_name:"about"
    })
};

exports.getRegisterPage=(req,res)=>{
    res.status(200).render('register',{
        page_name:"register"
    })
};
exports.getLoginPage=(req,res)=>{
    res.status(200).render('login',{
        page_name:"login"
    })
};
exports.getContactPage=(req,res)=>{
    res.status(200).render('contact',{
        page_name:"contact"
    })
};
exports.sendEmail=(req,res)=>{
    //burada html kodu yazacagimiz icin backtick kullaniyoruz
    const outputMessage =`
    <h1>Mail Details</h1>
    <ul style="list-style-type: none">
    <li>Name: ${req.body.name} </li>
    <li>Mail: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>

    `
   

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "",
          pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
      }
      
      main().catch(console.error);

};











