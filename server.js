const express = require("express");
const app = express();

const ejs = require("ejs");


app.use(express.static("public"));

app.get("/", (req, res, next) => {
  ejs.renderFile("./src/index.ejs", function(err, str){

    if(err) {
      next(err);
    return;
    }
    
    res.send(str);
});
});

app.get("/career", (req, res, next) => {
  ejs.renderFile("./src/pages/career.ejs", function(err, str) {

    if(err) {
      next(err);
    return;
    }
    
    res.send(str);
  });
});

app.get("/story", (req, res, next) => {
  ejs.renderFile("./src/pages/story.ejs", function(err, str) {

    if(err) {
      next(err);
    return;
    }
    
    res.send(str);
  });
});

app.use((err, req, res, next) => {
  if(err) {
    res.send(err.message);
    console.error(err);
  }
})

const fs = require('fs');
const nodemailer = require("nodemailer");
const urlencodedParser = express.urlencoded({extended: false});

app.post("/", urlencodedParser, (req, res) => {

    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    const enteredEmailAddress = req.body.userEmail;

    fs.appendFile('emailAddresses.txt', `\n${enteredEmailAddress}`, (error) => {
      console.log(error);
    });
    console.log(`Email address ${enteredEmailAddress} has been saved to emailAddresses.txt`);

      async function sendEmail() {

        try{

          let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: "hailee.kunde99@ethereal.email",
              pass: "sEEntMMKqJrKJfryfZ",
            },
          });

          const emailSettings = {
            from: '"Fred Foo 👻" <foo@example.com>',
            to: `${enteredEmailAddress}`,
            subject: "Thank you!",
            html: "<b>Thank you for subscription!</b>",
          }
          
          let sentEmail = await transporter.sendMail(emailSettings, (err) => {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully");
            }
          });
        
        } catch (error) {
          console.error(error);
        }
}
});

app.listen(8000, () => console.info("Server is running..."));