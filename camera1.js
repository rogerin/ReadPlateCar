const { exec } = require("child_process");


const ls1 = exec("alpr /dev/video0 -c br -j ");

let i = 0;

const
    io = require("socket.io-client"),
    ioClient = io.connect("http://192.168.2.141:3000");


ioClient.on("connect", function () {
    // console.log('user connected');
    ioClient.emit("event", { aqui: true })

    ls1.stdout.on("data", data => {
        let value = JSON.parse(data)
        //console.log(value.results[0].confidence)
        if(value.results.length) {
            

            if(value.results[0].confidence >= 79 ) {
                console.log('recebido', value.results[0])
                if(value.results[0].confidence >= 78.5) ioClient.emit("event", value.results[0]);
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

    
});

