"use strict"

const express = require("express");
const ejs = require("ejs");
const fs = require('fs');
const nodemailer = require("nodemailer");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res, next) => {

    ejs.renderFile("./src/index.ejs", {enteredEmailAddress: ""}, function(err, str){

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

const urlencodedParser = express.urlencoded({extended: false});
const emailValidity = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

app.post("/sendEmail", urlencodedParser, async (req, res, next) => {

    const enteredEmailAddress = req.body?.userEmail;

    if (!enteredEmailAddress) {
      return next(new Error("Email was not entered"));

    } else if (!emailValidity.test(enteredEmailAddress)) {
      return next(new Error("Email is invalid"));
    };

    fs.appendFile('emailAddresses.txt', `\n${enteredEmailAddress}`, (error) => console.log(error));

  try {

    await sendEmail(enteredEmailAddress);
    
    const htmlMainPage = await ejs.renderFile("./src/index.ejs", {enteredEmailAddress});
    res.send(htmlMainPage);

  } catch (error) {

    next(error);
  }

});

async function sendEmail(enteredEmailAddress) {

  let transporter = nodemailer.createTransport({

      service: 'gmail',
      auth: {
      user: "",
      pass: '',
      },
  });

  const emailSettings = {
    
      from: '"Company DB-" <>',
      to: `${enteredEmailAddress}`,
      subject: "Thank you for subscription!",
      html: `<p>Hello, you've just subscribed for updates on our website.</p> 
              <p>We will keep you updated on our services, discounts and many more!</p>
              <p>The emails will be sent to you every week. You may unsubscribe anytime.</p>
              <p>Thank you for subscription!</p>
              <p>Respectfully, Company DB-</p>`,
    }
    
  let sentEmail = await transporter.sendMail(emailSettings, (err) => {

      if (err) {
        console.log("Error " + err);

      } else {
        console.log("Email sent successfully");
      }
    });
}

app.use((err, req, res, next) => {

    if(err) {
      res.send(err.message);
      console.error(err);
    }
})

app.listen(8000, () => console.info("Server is running..."));