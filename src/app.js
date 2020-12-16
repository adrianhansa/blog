const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
app.set('view engine','hbs')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const publicPath = path.join(__dirname,'../public')
app.use(express.static(publicPath))

app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    return res.render('index', {
        name: "Paula Hansa",
        title: "Welcome to My Blog!"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Me"
    })
})

app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:"Contact Me"
    })
})

app.get('/articles', (req,res)=>{
    res.render('articles')
})

app.get('/articles/*',(req,res)=>{
    res.render('404',{
        errorMessage: "Article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage: "Page not found"
    })
})

app.listen(3001,()=>{
    console.log('Server is up and running listening on port 3001')
})