const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

//init express app
const app = express()

//connect to mongo db
mongoose.connect("mongodb://localhost/Blog")
const db = mongoose.connection

//check connection
db.once('open',()=>{
    console.log("Connected to mongo DB")
})
//if error coonection error
db.on("error" , (err)=>{
    console.log( err)
})

//init bodyparser
app.use( bodyParser.urlencoded({extended:false}))

//parse data to json
app.use(bodyParser.json())

//the public page 
app.use(express.static(path.join(__dirname,"public")))

//views 
app.set("views", path.join(__dirname,"views"))
app.set("view engine", "pug")

const Article = require("./models/articles")


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


//adding an article to the database
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


//get article by id
app.get("/:id", (req, res)=>{
      Article.findById(req.params.id, (err, article)=>{
          if (err) {
              console.log(err)
          } else {
            res.render("article",{
                article:article   
            })
          }
      } )

})

//edit article and save
app.post("/articles/edit/:id",(req,res)=>{
    const article = {}
    article.title= req.body.title
    article.author= req.body.author
    article.body = req.body.body

    const query = {_id:req.params.id}
    console.log(query)
    Article.update(query,article,(err)=>{
        if(err){
         console.log(err)
         console.log('error ooo')
         return;
        }
        else{
        res.redirect("/")
        }
    })
})

//send get request for edit
app.get("/articles/edit/:id",(req,res)=>{
    Article.findById(req.params.id, (err, article)=>{
        if (err) {
            console.log(err)
        } else {
          res.render("edit_article",{
              article:article   
          })
        }
    } )
})

app.listen(5000, ()=>{
    console.log("App started on server 5000")
})