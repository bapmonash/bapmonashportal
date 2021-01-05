const path = require('path')
const getDetails = require('./utils/hours')
const express = require('express')
const hbs = require('hbs')
const getEventDetails = require('./utils/events')
const moment = require('moment');

// Configure express
const port = process.env.PORT || 3000
const app = express()

//paths 
const publicDirectoryPath = path.join(__dirname,'../public')  
const bootstrapPath = path.join(__dirname,'../node_modules/bootstrap/dist')  
const faviconPath = path.join(__dirname,'../public/assets/favicon')

//set up static directory 
app.use(express.static(publicDirectoryPath))
app.use('/dist',express.static(bootstrapPath))
app.use('/favicon',express.static(faviconPath))

//handlebars
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath) // views property assigned to viewsPath
app.set('view engine','hbs') // views engine property assigned to handlebars
hbs.registerPartials(partialsPath)


//Date 
let now = moment()
let dateYear = now.year()


//Form Button
const button_one = 'Add Non-BAP Hours'
const button_one_link = 'http://google.com'

//titleOfApp
const siteTitle = 'Xi Epsilon Portal'


app.get('/favicon.ico', (req, res) => {
    // Use actual relative path to your .ico file here
    res.sendFile(path.resolve(faviconPath, '/favicon.ico'));
  });

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Content-Security-Policy": "script-src-elem 'self' https://www.google-analytics.com/analytics.js",
        "X-Content-Security-Policy": "default-src *",
        "X-WebKit-CSP": "default-src *"
    })
    next();
});

//home
app.get('', (req,res)=>{
    
    res.render('index',{
        title:siteTitle,
        buttonName:button_one,
        buttonLink:button_one_link,
        dateYear
    })
  
        getEventDetails(now,(error, {
            eventNo,name,place,about,image,link
        }={})=>{
            if(error){
                return res.send(error)
            }else{
                return res.send({
                    eventNo,name,place,about,image,link
                })
            }
        })
    
    
})

//events
app.get('/events', (req,res)=>{

    if(!req.query.event){
        res.render('Events',{
            siteTitle:siteTitle,
            title:'Events',
            dateYear
        })
    } else if(req.query.event=='all'){
        getEventDetails(req.query.event,(error, {data})=>{
            if(error){
                return res.send(error)
            }else{
                return res.send({data})
            }
        })
    
    }else if(req.query.event=='upcoming'){
        getEventDetails(req.query.event,(error, {
            eventNo,name,place,about,image,link
        }={})=>{
            if(error){
                return res.send(error)
            }else{
                return res.send({
                    eventNo,name,place,about,image,link
                })
            }
        })
    }
})

//hours
app.get('/hours', (req,res)=>{
    if(!req.query.studentId){
        res.render('Hours',{
            siteTitle:siteTitle,
            title:'Hours',
            buttonName:button_one,
            buttonLink:button_one_link,
            dateYear
        })
    }else{
        getDetails(req.query.studentId,(error,{studentId,fullName,
            totalProfessionalHours,totalServiceHours, certificateLink,
            memberTitle,Professional,Service}={})=>{
            if(error){
                return res.send(error)
            }else{
                return res.send({
                    studentId,
                    fullName,
                    memberTitle,
                    totalProfessionalHours,
                    totalServiceHours,
                    certificateLink,
                    Professional,
                    Service
                })
            }
        })
    }
})

//404
app.get('*', (req,res)=>{
    res.render('404',{
        siteTitle:siteTitle,
        title:'404',
        dateYear
    })
})

//listening port
app.listen(port, ()=>{
    console.log(`app is at port http://localhost:${port}`)
})
