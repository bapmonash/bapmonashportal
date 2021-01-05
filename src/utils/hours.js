const keys = require('../../keys.json')
const {google} = require('googleapis')


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
        range:'Hours!1:19'
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
        let professionalCount =  0
        let serviceCount =0
        keys.forEach((key, i) => {    
                if(key === 'Professional'){
                    object[key] = {}
                    professionalCount++
                }else if(key === 'Service' ){
                    object[key] = {}
                    serviceCount++
                }
                if(professionalCount && !serviceCount  && key!== 'Professional'){
                    object['Professional'][key] = parseFloat(array[i])
                }else if(professionalCount && serviceCount  && key!== 'Service'){
                    object['Service'][key] = parseFloat(array[i])
                }else if(!serviceCount && !professionalCount ){
                    object[key] = array[i]
                }     
            }    
        )
        return object;
    })
    return objects
}

// Get member

async function getMember(members,studentId){
    let retVal 
    members.forEach((member)=>{
        if (member.studentId==studentId){
            retVal =  member
        }
    })
    return retVal
}


const getDetails = (studentId, callback)=>{
    const id=studentId
   
    client.authorize((error,tokens)=>{
        if(error){
            callback(error, undefined)
            console.log(error)
        }else{
            gsrun(client).then((data)=>{
                return data 
            }).then((data)=>{
                let member = getMember(data,id)
                return member
            }).then((member)=>{
                if(!member){
                    callback('no member found', undefined)
                }else{
                    
                    const {studentId,fullName,memberTitle,
                        totalProfessionalHours,totalServiceHours,certificateLink,
                        Professional,Service} = member
                    callback(undefined, { 
                        studentId,
                        fullName,
                        memberTitle,
                        totalProfessionalHours,
                        totalServiceHours,
                        Professional,
                        certificateLink,
                        Service
                    })
                }  
            }).catch((error)=>{
                return error
            })   
            
        }
    })
}


module.exports =  getDetails
