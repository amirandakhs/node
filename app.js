//express app
const express  = require("express");
const blogRoutes = require("./routes/blogRoutes");
const morgan = require('morgan');
require("dotenv").config();



const app = express();



// Register view engine 
app.set('view engine', 'ejs');
// app.set('views', 'views');

// mongodb

const mongoose = require("mongoose");

//morgan middleware for console log
// const morgan = require("morgan");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));






mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then( 
    (result) =>{
        //listen for request 
        console.log("Connected to the database");
        app.listen(3000);
        
}).catch( 
    (err) => {
        console.log(err);
    })





app.get("/all-blog", (req, res)=> {
    Blog.find().then( (result)=> {
        res.send(result);
    }).catch( (err)=> {
        res.send(err);
    })
})



app.get("/", function(req, res){
   res.redirect("/blogs")
});

// app.get("/about", function(req, res){

//     res.render("about", { title: 'About' });

// });

app.use("/blogs", blogRoutes);



// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });

