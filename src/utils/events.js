const keys = require('../../keys.json')
const {google} = require('googleapis')
const moment = require('moment');


// Configure Client for Google Sheets API
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);



async function gsrun(client){
    const gsapi= google.sheets({
        version:'v4',
        auth: client
    })

    const options= {
        spreadsheetId:'1I_QoYyfm-wF2o71sU-kos1b6KZD3tAaUWcCT78mJFO8',
        range:'Events!A:J'
    }
    let main = await gsapi.spreadsheets.values.get(options)
    let data = main.data.values
    dataJSON = arrayToJSON(data)
    return dataJSON 
}

const arrayToJSON = function(arrays){
    const keys = arrays[0]
    const values = arrays.slice(1)
    const objects = values.map(array => {
        let object = {}
        keys.forEach((key, i) => {    
                object[key] = array[i]
        })
        return object;
    })

    return objects
}

// Get member

async function getEvent(events){
    const now = moment()
    let retValDifference = Number.POSITIVE_INFINITY
    let eventNo
    events.forEach((event)=>{

        let eventDate = moment(event.date,"DD-MM-YYYY")
        
        difference = eventDate.diff(now,'days')+1

        // console.log(`now: ${now} event date: ${eventDate} ${event.name} | ${difference} days`)
        
        if (difference<retValDifference && difference>0){
            retValDifference=difference
            eventNo = event.eventNo
        }
    })

   
    let upcomingEvent
    events.forEach((event)=>{
        if (event.eventNo==eventNo){
            upcomingEvent =  event
        }
    })
    return upcomingEvent
}


const getUpcoming = (callback)=>{

    client.authorize((error,tokens)=>{
        if(error){
            callback(error, undefined)
            console.log(error)
        }else{
            gsrun(client).then((data)=>{
                return data 
            }).then((data)=>{
                let event = getEvent(data)
                return event
            }).then((event)=>{
                // console.log(event)
                if(!event){
                    callback('no event found', undefined)
                }else{
                    
                    const {eventNo, date,time,type,name,place,about,image,link, linkText} = event
                    callback(undefined, { 
                        eventNo,
                        date, 
                        time,
                        type,
                        name,
                        place,
                        about,
                        image,
                        link,
                        linkText
                    })
                }  
            }).catch((error)=>{
                return error
            })   
            
        }
    })
}


const getAll = (callback)=>{
    client.authorize((error,tokens)=>{
        if(error){
            callback(error, undefined)
            console.log(error)
        }else{
            gsrun(client).then((data)=>{
                return data 
               
            }).then((data)=>{
                callback(undefined,{data})
            }).catch((error)=>{
                return error
            })   
            
        }
    })
}


const getEventDetails = (event={},callback)=>{
    if(event=='all'){
        getAll(callback)
    }else if (event=='upcoming'){
        getUpcoming(callback)
    }
}

module.exports =  getEventDetails
