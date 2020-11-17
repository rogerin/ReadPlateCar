/*
 DOC
 command: v4l2-ctl --list-devices
 alpr /dev/video0 -j stdin > /home/pi/Documents/readplate/public/camera1.json 
 alpr /dev/video2 -j stdin > /home/pi/Documents/readplate/public/camera2.json 
 alpr /dev/video4 -j stdin > /home/pi/Documents/readplate/public/camera3.json 
 alpr /dev/video6 -j stdin > /home/pi/Documents/readplate/public/camera4.json 
 

*/

const EventEmitter = require('events');
const fs  = require("fs");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


const myEmitter = new EventEmitter();
let connected = false;

io.on("connection", function (client) {
    connected = true;
    
    myEmitter.on('event', function(data, camera) {
        if(connected) {
            client.emit("event", data.results[0]);
        }
    });

})

let paths = {
    camera1: './public/camera1.json',
    camera2: './public/camera2.json',
    camera3: './public/camera3.json',
    camera4: './public/camera4.json',
};

let read = true;
fs.watch(paths.camera1, function (event, filename) {
    if (filename) {
        try {
            fs.readFile(filename, function(error, data){
                try {
                    let value = JSON.parse(data);
                    
                    if(value.results.length) {
                        if(value.results[0].confidence >= 79 ) {
                            if(value.results[0].confidence >= 78.5) myEmitter.emit('event', value)
                        }
                    }
                } catch (error) { }
            })
        } catch (error) {
            console.log(error)
        }
        //myEmitter.emit('event', student);
    } else {
        console.log('filename not provided');
    }
});

fs.watch(paths.camera2, function (event, filename) {
    if (filename) {
        try {
            fs.readFile(filename, function(error, data){
                try {
                    let value = JSON.parse(data);
                    
                    if(value.results.length) {
                        if(value.results[0].confidence >= 79 ) {
                            if(value.results[0].confidence >= 78.5) myEmitter.emit('event', value)
                        }
                    }
                } catch (error) { }
            })
        } catch (error) {
            console.log(error)
        }
        //myEmitter.emit('event', student);
    } else {
        console.log('filename not provided');
    }
});

fs.watch(paths.camera3, function (event, filename) {
    
    if (filename) {
        console.log(paths.camera3)
        try {
            fs.readFile(filename, function(error, data){
                try {
                    let value = JSON.parse(data);
                    
                    if(value.results.length) {
                        if(value.results[0].confidence >= 79 ) {
                            if(value.results[0].confidence >= 78.5) myEmitter.emit('event', value)
                        }
                    }
                } catch (error) { }
            })
        } catch (error) {
            console.log(error)
        }
        //myEmitter.emit('event', student);
    } else {
        console.log('filename not provided');
    }
});

fs.watch(paths.camera4, function (event, filename) {
    if (filename) {
        console.log(paths.camera4)
        try {
            fs.readFile(filename, function(error, data){
                try {
                    let value = JSON.parse(data);
                    
                    if(value.results.length) {
                        if(value.results[0].confidence >= 79 ) {
                            if(value.results[0].confidence >= 78.5) myEmitter.emit('event', value)
                        }
                    }
                } catch (error) { }
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