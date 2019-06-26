const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

//init express app
const app = express()

//article model

const Article = require("./models/articles")

//connect to mongo db
mongoose.connect("mongodb://localhost/Blog")
const db = mongoose.connection

//check connection

db.once('open',()=>{
    console.log("Connected to mongo DB")
})

db.on("error" , (err)=>{
    console.log( err)
})


//init bodyparser

app.use( bodyParser.urlencoded({extended:false}))

//parse data to json
app.use(bodyParser.json())



//route for index page

Article.find({},(err, articles)=>{
    if (err) {
        console.log(err)
    } else {
        app.get('/' , (req, res)=>{
            res.render('index', {
               title: "Article",
               articles:articles
            })
        })
      
    }
})
// add article path
app.get('/add/articles' , (req, res)=>{
    res.render('add_article', {
       title: "add article"
    })
})

app.post("/add/articles",(req,res)=>{
    const article = new Article()
    article.title= req.body.title
    article.author= req.body.author
    article.body = req.body.body

    article.save((err)=>{
        if(err){
         console.log(err)
        }
        else{
         res.redirect("/")
        }
    })
})

//views 
app.set("views", path.join(__dirname,"views"))
app.set("view engine", "pug")


app.listen(5000, ()=>{
    console.log("App started on server 5000")
})