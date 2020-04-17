//adding express and path moduels to app.js
const express=require('express')
const path =require('path')
const hbs=require('hbs')

// connect out geocode and forecast functions.
const geoCode=require('./utils/geoCode')
const foreCast=require('./utils/foreCast')


//creating and adding a path to create and maintain staic html pages.
const pathDirectory=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
// calling express function so that we can create and use routes.
const app=express()

const port= process.env.PORT || 3000

//Setting templete engine with handlebars.
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setting up static path directory.
app.use(express.static(pathDirectory))


// creating routes 
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        author:'Deekshith'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        author:'Deekshith'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        author:'Deekshith'
    })
})


app.get('/show_weather',(req,res) => {
    const address=req.query.address
    if(!address){
        return res.send('Please provide a valid address')
    }
    geoCode(address, function callback(error,{latitude,longitude,location}={}){
        if(error){
            return res.send({
                error:error
            })
        }
       
        foreCast(latitude,longitude,function callback(error,forecastdata){
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
               location:location,
               data:forecastdata,
               address
               
            })
          
            
        })
    
    })



})
app.get('/help/*',(req,res) =>{
    res.render('error',{
        title:"404 Error!",
        text:"Help article Not Found",
        author:"Deekshith"
    })
})

app.get('*',(req,res) =>{
    // console.log(req.url);
    res.render('error',{
        title:"404 Error!",
        text:"Page Not Found",
        author:"Deekshith"
    })
})


app.listen(port,function(){
    console.log('Server started on port ' + port)
})