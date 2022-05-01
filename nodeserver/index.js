//Node server to handle socket.io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });


const users={}

//io.on is an instance of socket.io which tells us that a user has been joined
//what has to be done with the user who has joined is the responsiblity of the socket.on


io.on('connection',socket=>{

    //if an new user joined occurs
    socket.on('new-user-joined',name=>
    {
        console.log("new user joined",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);

    });
    
     //if send message event occurs
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id] 
  });
})
