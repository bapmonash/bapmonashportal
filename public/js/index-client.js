const upcoming_panel = document.querySelector('#upcoming-event')

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


        const name = document.createElement('p')
        name.textContent = data.name


        const date = document.createElement('p')
        const eventDate = moment(data.date, "DD-MM-YYYY")
        date.textContent = eventDate.format("MMM-DD-YYYY")

        const place = document.createElement('p')
        place.textContent = data.place

        const about = document.createElement('p')
        about.textContent = `${data.about.slice(0,60)}...`


        upcoming_panel.appendChild(name)
        upcoming_panel.appendChild(date)
        upcoming_panel.appendChild(place)
        upcoming_panel.appendChild(about)
       
    }).catch((error)=>{
    
        console.log(error)

    })
}
makePreloader()
loadEvent()

    