const { exec, spawn } = require("child_process");
const EventEmitter = require('events');
const fs  = require("fs");

var express = require('express');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


const myEmitter = new EventEmitter();

let connected = false;

let client;

io.on("connection", function (client) {
    connected = true;
    
    
myEmitter.on('event', function(data, camera) {
    if(connected) {

        console.log("====================================")

        console.log('EVENTO', data.results[0]);

        console.log(client)
        client.emit("event", data.results[0]);

    }
});

})



let read = true;
fs.watch('./teste.json', function (event, filename) {
    if (filename) {
        console.log('filename provided: ' + filename);
        console.log(read)
        try {
            fs.readFile(filename, function(error, data){
                try {
                    let value = JSON.parse(data);
                    
                    if(value.results.length) {
                        if(value.results[0].confidence >= 79 ) {
                            if(value.results[0].confidence >= 78.5) myEmitter.emit('event', value)
                        }
                    }
                } catch (error) {
                    
                }
            })
            
        } catch (error) {
            console.log(error)
        }
        //myEmitter.emit('event', student);
    } else {
        console.log('filename not provided');
    }
});



http.listen(3000, function(){
    console.log('listening on port 3000');
});