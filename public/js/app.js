const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message_1=document.getElementById('message-1')
const message_2=document.getElementById('message-2')

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location=search.value
    // console.log(location)
    message_1.textContent='Loading.....'
    message_2.textContent=" "
    fetch('http://localhost:3000/show_weather?address='+ location).then( (response) =>{
    response.json().then((data) =>{
       if(data.error){
           message_1.textContent=data.error
           console.log(data.error)
       } 
       else{
        console.log(data.location)
        console.log(data.address)
        console.log(data.data)
   }
        message_1.textContent=data.location
        message_2.textContent=data.data
        
        
    })
})
})

// const sendData = () =>{
// const search_location=document.getElementById('location').value
// const xoo=document.getElementById('xoo')
// fetch('http://localhost:3000/show_weather?address=!'+search_location).then( (response) =>{
//     response.json().then((data) =>{
//        if(data.error){
//            console.log(data.error)
//        } 
//        else{
//         console.log(data.location)
//         console.log(data.address)
//         console.log(data.data)
//     }
        
//     })
// })
// xoo.textContent=data.address
// }