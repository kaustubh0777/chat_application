//getting dom variable in respective JS variables

const socket=io('http://localhost:8000');
const form =document.getElementById('messagecont')
const messageinp=document.getElementById('messageinp')
const messagecontainer=document.querySelector('.container')

var audio=new Audio('tune.mp3')


//function to append to the container  
const append=(message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)

    messagecontainer.append(messageElement);

    if(position=='left')
    {
    audio.play();
    }


}  


//if the form gets submitted ,just send the message to the server
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value 
    append(`You : ${message}`,'right')
    socket.emit('send',message);
    messageinp.value=''
    
})

//asks if a new user joins
const name=prompt("Enter the name");
socket.emit('new-user-joined',name);

//if a new user joins

socket.on('user-joined',data=>{
    append(`${data} user joined`,'right');

})

//if a user receives message
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');

})

//if a user lefts the chat
socket.on('left',name=>{
    append(`${name} left the chat`,'left');

})


