
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
        console.log(data)
        events_panel.textContent=''

        data.data.forEach(event => {
            const text = document.createElement('p')
            text.textContent = event.name
            events_panel.appendChild(text)
            
        })
       
    }).catch((error)=>{
    
        console.log(error)

    })
}


makePreloader()
loadEvents()

    