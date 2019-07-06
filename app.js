const express = require('express');
const app=express();

app.set('view engine', 'ejs')

app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'))


app.get('/',(req,res)=>
{
res.render('index');
});

var port = 8080;

server = app.listen(port,()=>{
    console.log("server listening on: "+port);
});

const io=require('socket.io')(server)


io.on('connection',(socket)=>
{
    console.log("New user connected");
    socket.username="Unknown";

    socket.on('change_username',(data)=>{
        socket.username=data.username
    })

    socket.on('new_message', (data) => {
        
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
});



