const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.sendEmail = async (req, res) => {
  try {
    //burada html kodu yazacagimiz icin backtick kullaniyoruz
    const outputMessage = `
      <h1>Mail Details</h1>
      <ul style="list-style-type: none">
        <li>Name: ${req.body.name} </li>
        <li>Mail: ${req.body.email}</li>
      </ul>
      <h1>Message</h1>
      <p>${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "myemail@gmail.com",
        pass: "mypassword",
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" ', // sender address
      to: "email@gmail.com", // list of receivers
      subject: "Smart EDU new message", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    req.flash("success", "We Received your message successfully");
    res.status(200).redirect("contact");
  } catch (err) {
    console.error("Error:", err);
    req.flash("error", `Something went wrong! ${err}`);
    res.status(200).redirect("contact");
  }
};
