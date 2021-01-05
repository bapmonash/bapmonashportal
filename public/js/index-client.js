const upcoming_panel = document.querySelector('#upcoming-event')


const makePreloader = () =>{
    upcoming_panel.textContent=''
    const loader = document.createElement('div')
    loader.setAttribute('class','squares-preloader')
    loader.setAttribute('style','margin-top:20vh;margin-bottom:20vh;')
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
        console.log(data)
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

    