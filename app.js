const { exec } = require("child_process");


var express = require('express');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('server is running');
});


const ls1 = exec("alpr /dev/video0 -c br -j ");
const ls2 = exec("alpr /dev/video1 -c br -j ");
const ls3 = exec("alpr /dev/video2 -c br -j ");
//const ls4 = exec("alpr webcam -c br -j ");



io.on("connection", function (client) {
    console.log('user connected');

    ls1.stdout.on("data", data => {
        let value = JSON.parse(data)
        //console.log(value.results[0].confidence)
        if(value.results.length) {
            

            if(value.results[0].confidence >= 79 ) {
                console.log('recebido', value.results[0])
                if(value.results[0].confidence >= 78.5) client.emit("event", value.results[0]);
            }
        }
    });

    ls1.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls1.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls1.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });


    ls.stdout.on("data", data => {
        let value = JSON.parse(data)
        //console.log(value.results[0].confidence)
        if(value.results.length) {
            

            if(value.results[0].confidence >= 79 ) {
                console.log('recebido', value.results[0])
                if(value.results[0].confidence >= 78.5) client.emit("event", value.results[0]);
            }
        }
    });

    ls2.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls2.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls2.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });




    ls4.stdout.on("data", data => {
        let value = JSON.parse(data)
        //console.log(value.results[0].confidence)
        if(value.results.length) {
            

            if(value.results[0].confidence >= 79 ) {
                console.log('recebido', value.results[0])
                if(value.results[0].confidence >= 78.5) client.emit("event", value.results[0]);
            }
        }
    });

    ls3.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls3.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls3.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });


    // ls4.stdout.on("data", data => {
    //     let value = JSON.parse(data)
    //     //console.log(value.results[0].confidence)
    //     if(value.results.length) {
            

    //         if(value.results[0].confidence >= 79 ) {
    //             console.log('recebido', value.results[0])
    //             if(value.results[0].confidence >= 78.5) client.emit("event", value.results[0]);
    //         }
    //     }
    // });

    // ls4.stderr.on("data", data => {
    //     console.log(`stderr: ${data}`);
    // });

    // ls4.on('error', (error) => {
    //     console.log(`error: ${error.message}`);
    // });

    // ls4.on("close", code => {
    //     console.log(`child process exited with code ${code}`);
    // });







    
});

//SocketIO vem aqui




http.listen(3000, function(){
    console.log('listening on port 3000');
});