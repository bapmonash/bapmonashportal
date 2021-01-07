
// Hours Page 
const form = document.querySelector('#location-form')
const search = document.querySelector('input')
const output = document.querySelector('#output')
const professional = document.querySelector('#professional')
const service = document.querySelector('#service')

const getMember = (member) =>{
    url = `/hours?studentId=${member}`

    fetch(url).then((response)=>{
  
        if(response.status ===200 ){
      
            return response.json()
        }else{
            throw new Error('No member found')
        }
        
    }).then(({studentId,fullName,memberTitle,totalProfessionalHours,totalServiceHours,certificateLink,Professional,Service})=>{
        console.log(totalServiceHours)
        output.textContent=''
        professional.textContent=''
        service.textContent=''


        const row= document.createElement('div')
        row.setAttribute('id','hours-container')
        row.setAttribute('class','row')

        row.appendChild(createDashboardCard(fullName,`${studentId}/${memberTitle}`,certificateLink,"Full Member Certificate",'red'))
        
        row.appendChild(createDashboardCard('Professional Hours',totalProfessionalHours,'/events',"See Events",'dark'))
        
        row.appendChild(createDashboardCard('Service Hours',totalServiceHours,'/events',"See Events",'dark'))
        

        professional.appendChild(createTitleHoursCard('Professional Events'))

         // Professional List
         const professionalMap = new Map(Object.entries(Professional))
         for (const[key,value] of professionalMap.entries()){
            
             let hours 
             if(parseInt(value) >1){
                 hours = `${key}: ${value} hours`
             }else{
                hours = `${key}: ${value} hour`
             }
             professional.appendChild(createEventCard(key,hours))
         }

        service.appendChild(createTitleHoursCard('Service Events'))

        // Service List

        const serviceMap = new Map(Object.entries(Service))
         for (const[key,value] of serviceMap.entries()){
            
             let hours 
             if(parseInt(value) >1){
                 hours = `${key}: ${value} hours`
             }else{
                hours = `${key}: ${value} hour`
             }
             service.appendChild(createEventCard(key,hours))
         }


        output.appendChild(row)

        

       
    }).catch((error)=>{
        output.textContent=''
        const cardText = document.createElement('p')
        cardText.textContent = 'No member found'
        output.appendChild(cardText)
        console.log(error)

    })
}


form.addEventListener('submit',(e)=>{
    output.textContent=''
    professional.textContent=''
    service.textContent=''
    const loader = document.createElement('div')
    loader.setAttribute('class','squares-preloader')
    loader.setAttribute('style','margin-top:20vh;margin-bottom:20vh;')
    output.appendChild(loader)
    professional.appendChild(loader)
    service.appendChild(loader)
    console.log(search.value)
    e.preventDefault()
    getMember(search.value)
} )



const createDashboardCard = (title,body,link, linkText, color) =>{
    const card= document.createElement('div')
    card.setAttribute('class','full-card cards col-sm-4')

    const shadow= document.createElement('div')
    shadow.setAttribute('class','card text-white shadow')

    const cardBody= document.createElement('div')
    cardBody.setAttribute('class',`card-body dashboard-card-${color}`)


    const titleText= document.createElement('h3')
    titleText.setAttribute('class',`card-title`)
    titleText.textContent = title


    const bodyText= document.createElement('p')
    bodyText.textContent = body

    const button = document.createElement('button')
    button.setAttribute('class','btn btn-light')
    button.setAttribute('onclick',`location.href="${link}"`)
    button.textContent = linkText

    cardBody.appendChild(titleText)
    cardBody.appendChild(bodyText)
    console.log(link)
    if(link){
        cardBody.appendChild(button)
    }
    shadow.appendChild(cardBody)

    card.appendChild(shadow)

    return card

}


const createTitleHoursCard = (name) =>{
    const fullCard = document.createElement('div')
    fullCard.setAttribute('class','full-card cards col-sm-16')

    const shadow= document.createElement('div')
    shadow.setAttribute('class','card text-white shadow')

    const cardBody= document.createElement('div')
    cardBody.setAttribute('class',`card-body dashboard-card-alert-title-red`)

    const nameText= document.createElement('h3')
    nameText.textContent = name

    cardBody.appendChild(nameText)

    shadow.appendChild(cardBody)

    fullCard.appendChild(shadow)

    return fullCard

}


const createEventCard = (name, hours) =>{
    const fullCard = document.createElement('div')
    fullCard.setAttribute('class','full-card cards col-sm-16')

    const shadow= document.createElement('div')
    shadow.setAttribute('class','card shadow')

    const cardBody= document.createElement('div')
    cardBody.setAttribute('class',`card-body dashboard-card-alert-title-light`)

    const nameText= document.createElement('h6')
    nameText.textContent = `${name}     `

    const hoursText= document.createElement('span')
    hoursText.setAttribute('class','badge badge-secondary')
    hoursText.textContent = hours

    nameText.appendChild(hoursText)

    cardBody.appendChild(nameText)

    shadow.appendChild(cardBody)

    fullCard.appendChild(shadow)

    return fullCard

}

