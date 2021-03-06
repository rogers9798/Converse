var express = require('express');
var app=express();
var http =require('http');
var https=require('https');

app.set('view engine', 'ejs')

app.use(express.static(__dirname +'/public'))


app.get('/',(req,res)=>
{
res.render('index');
});

var port = process.env.PORT || 8080;

server = app.listen(port,()=>{
    console.log("server listening on: "+port);
});

var io=require('socket.io')(server);


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



