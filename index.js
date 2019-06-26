const express = require("express");
const path = require("path")


const app = express()

let articles = [
    {
        id:1,
        title:" article 1",
        author:"daniel ifechuku",
        body:"article one "
    },
    {
        id:2,
        title:" article 2",
        author:"daniel ifechuku",
        body:"article two "
    },
    {
        id:3,
        title:" article 3",
        author:"daniel ifechuku",
        body:"article three "
    }

]

app.get('/' , (req, res)=>{
    res.render('index', {
       title: "Article",
       articles:articles
    })
})


app.get('/add/articles' , (req, res)=>{
    res.render('add_article', {
       title: "add article"
    })
})

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "pug")


app.listen(5000, ()=>{
    console.log("App started on server 5000")
})