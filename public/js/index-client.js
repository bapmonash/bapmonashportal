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
        const text = document.createElement('p')
        text.textContent = data.name
        upcoming_panel.appendChild(text)
            
       
    }).catch((error)=>{
    
        console.log(error)

    })
}
makePreloader()
loadEvent()

    