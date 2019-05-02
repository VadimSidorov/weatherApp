fetch('/weather?address=!').then((response => {
    response.json().then((data)=>{
        if (data.err){
            return console.log(data.err)
        } console.log(data)
    })
}))
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response => {
    response.json().then((data)=>{
        if (data.error){
            return messageTwo.textContent = data.error
        } messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
    })
}))
})