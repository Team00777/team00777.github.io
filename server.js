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

app.use((err, req, res, next) => {
  if(err) {
    res.send(err.message);
    console.error(err);
  }
})

app.listen(8000, () => console.info("Server is running..."));