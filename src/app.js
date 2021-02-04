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
const button_one_link = 'https://linktr.ee/bapmonash'

//titleOfApp
const siteTitle = 'Xi Epsilon Portal'


//home
app.get('', (req,res)=>{
    
    res.render('index',{
        title:siteTitle,
        buttonName:button_one,
        buttonLink:button_one_link,
        dateYear
    })
  
        getEventDetails(now,(error, {
            eventNo,date,time,type,name,place,about,image,link, linkText
        }={})=>{
            if(error){
                return res.send(error)
            }else{
                return res.send({
                    eventNo,date,time,type,name,place,about,image,link, linkText
                })
            }
        })
    
    
})

//events
app.get('/events', (req,res)=>{

    if(!req.query.event){
        res.render('events',{
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
            eventNo,date,time,type,name,place,about,image,link, linkText
        }={})=>{
            if(error){
                return res.send(error)
            }else{
                return res.send({
                    eventNo,date,time,type,name,place,about,image,link,linkText
                })
            }
        })
    }
})

//hours
app.get('/hours', (req,res)=>{
    if(!req.query.studentId){
        res.render('hours',{
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


// about 

app.get('/about', (req,res)=>{
    res.render('about',{
            siteTitle:siteTitle,
            title:'About',
            dateYear
    })
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
