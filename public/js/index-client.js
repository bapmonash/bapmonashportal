const upcoming_panel = document.querySelector('#upcoming-event')

const hero_container = document.querySelector('#index-container')


const makePreloader = () =>{
    upcoming_panel.textContent=''
    const loader = document.createElement('div')
    loader.setAttribute('class','squares-preloader')
    upcoming_panel.appendChild(loader)
}


const loadEvent = () =>{
  
    url = `/events?event=upcoming`
    fetch(url).then((response)=>{
        if(response.status ===200 ){
            return response.json()
        }else{
            throw new Error('No events found')
        }
    }).then((data)=>{
       
        upcoming_panel.textContent=''
        console.log(data)
        console.log(data.linkText)
        hero_container.appendChild(createEvent(data.date,data.time,
            data.type,data.name,
            data.place,data.about,data.image,data.link,data.linkText))
       
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
loadEvent()