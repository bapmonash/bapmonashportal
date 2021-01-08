
// Events Page

const events_panel = document.querySelector('#events-panel')



const makePreloader = () =>{
    events_panel.textContent=''
    const loader = document.createElement('div')
    loader.setAttribute('class','squares-preloader')
    loader.setAttribute('style','margin-top:20vh;margin-bottom:20vh;')
    events_panel.appendChild(loader)
}

const loadEvents = () =>{
  
    url = `/events?event=all`
    fetch(url).then((response)=>{
        if(response.status ===200 ){
            return response.json()
        }else{
            throw new Error('No events found')
        }
    }).then((data)=>{
        events_panel.textContent=''
        console.log(data.data)
        

        data.data.forEach(event => {
            console.log(event.linkText)
            events_panel.appendChild(createEvent(
                event.date,event.time,
                event.type,event.name,
                event.place,event.about,
                event.image,event.link,
                event.linkText))
            
        })
       
    }).catch((error)=>{
    
        console.log(error)

    })
}


const createEvent = (date,time,type,name,place,about,image,link,linkText) => {

    const cards = document.createElement('div')
    cards.setAttribute('class','cards col-sm-6')

    if(!date || !time || !name || !place ){
        return cards
    }
    


    const cardShadow = document.createElement('div')
    cardShadow.setAttribute('class','card shadow')

    const crop = document.createElement('div')
    crop.setAttribute('class','crop')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body')



    const nameContainer = document.createElement('h5')
    nameContainer.setAttribute('class','card-title text-muted')
    nameContainer.setAttribute('style','text-decoration:underline;')
    nameContainer.textContent = name


    const dateContainer = document.createElement('p')
    dateContainer.setAttribute('class','card-title text-muted')
    const eventDate = moment(date, "DD-MM-YYYY")
    const dateText = eventDate.format("MMM-DD-YYYY")
    const eventTime = moment(time,"hh:mm A")
    const timeText = eventTime.format("hh:mm A")
    dateContainer.textContent = `${dateText} ${timeText}`

    const placeContainer = document.createElement('p')
    placeContainer.setAttribute('class','card-title text-muted')
    placeContainer.textContent = place

    const typeContainer = document.createElement('p')
    typeContainer.setAttribute('class','card-title text-muted')
    typeContainer.textContent =`${type.toProperCase()} Event`


    const aboutContainer = document.createElement('p')
    if(about){
        aboutContainer.textContent = `${about.slice(0,60)}...`
    }else{
        aboutContainer.textContent = ``
    }
    

    
    const imageContainer= document.createElement('img')
    if(!image){
        image = '../assets/red.png'
    }
    imageContainer.setAttribute('src',image)
    imageContainer.setAttribute('height',"200px")



    const registerContainer = document.createElement('button')
    registerContainer.setAttribute('class','btn btn-dark btn-block"')
    registerContainer.setAttribute('onclick',`location.href="${link}"`)
    if(linkText){
        registerContainer.textContent = linkText
    }else{
        registerContainer.textContent = 'Register Here'
    }
    
    


    crop.appendChild(imageContainer)
    cardBody.appendChild(nameContainer)
    cardBody.appendChild(typeContainer)
    cardBody.appendChild(dateContainer)
    cardBody.appendChild(placeContainer)
    cardBody.appendChild(aboutContainer)

    if(link){
        cardBody.appendChild(registerContainer)
    }
    
    cardShadow.appendChild(crop)
    cardShadow.appendChild(cardBody)


    cards.appendChild(cardShadow)
    return cards
}



String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

makePreloader()
loadEvents()