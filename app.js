const { exec } = require("child_process");


var express = require('express');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('server is running');
});

io.on("connection", function (client) {
    console.log('user connected');


    const ls = exec("alpr webcam -c br -j ");


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

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });



    
});

//SocketIO vem aqui




http.listen(3000, function(){
    console.log('listening on port 3000');
});