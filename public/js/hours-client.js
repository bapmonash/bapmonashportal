
// Hours Page 
const form = document.querySelector('#location-form')
const search = document.querySelector('input')
const output = document.querySelector('#output')


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

        const membership= document.createElement('p')
        membership.textContent = `${memberTitle}`

        const id = document.createElement('p')
        id.textContent = `student id: ${studentId}`

        const name= document.createElement('p')
        name.textContent = `${fullName} `


        const professionalHours= document.createElement('p')
        professionalHours.textContent = `Professional Hours: ${totalProfessionalHours}`

        const serviceHours= document.createElement('p')
        serviceHours.textContent = `Service Hours: ${totalServiceHours}`
        
        output.appendChild(name)
        output.appendChild(id)

        output.appendChild(membership)
        if(certificateLink){
            const credential= document.createElement('a')
            credential.href = certificateLink
            credential.textContent="full member certificate\n"
            output.appendChild(credential)
        }
            
        // Professional List
        output.appendChild(professionalHours)
        const professionalList= document.createElement('ul')
        const professionalMap = new Map(Object.entries(Professional))
        for (const[key,value] of professionalMap.entries()){
            const professionalEvent = document.createElement('li')
            if(parseInt(value) >1){
                professionalEvent.textContent = `${key}: ${value} hours`
            }else{
                professionalEvent.textContent = `${key}: ${value} hour`
            }
            professionalList.appendChild(professionalEvent)
        }
        output.appendChild(professionalList)



        // Service List
        output.appendChild(serviceHours)
        const serviceList= document.createElement('ul')
        const serviceMap = new Map(Object.entries(Service))
        for (const[key,value] of serviceMap.entries()){
            const serviceEvent = document.createElement('li')
            if(parseInt(value) >1){
                serviceEvent.textContent = `${key}: ${value} hours`
            }else{
                serviceEvent.textContent = `${key}: ${value} hour`
            }
            serviceList.appendChild(serviceEvent)
        }
        output.appendChild(serviceList)



       
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
    const loader = document.createElement('div')
    loader.setAttribute('class','squares-preloader')
    loader.setAttribute('style','margin-top:20vh;margin-bottom:20vh;')
    output.appendChild(loader)
    console.log(search.value)
    e.preventDefault()
    getMember(search.value)
} )
