const http = require('http');
const fs = require('fs');


http.createServer((req, res) => {
    console.log('Requested');

    if (req.method == 'GET') {
        // fs.readFile('./index.html', (err,data) => {
        //     res.write(data.toString());
        //     res.end();
        // });

        // const fileSystem = fs.createReadStream('./index.html')
        // fileSystem.on('data', chunk => {
        //     res.write(chunk);
        // })
        // fileSystem.on('end', () => {
        //     res.end();
        // })
        fs.createReadStream('./index.html').pipe(res)
    } else if (req.method == 'POST') {
        let body = '';
        req.on('data', (data) => {
            console.log('Chunk >>>', data.toString());
            body += data;
        });
        req.on('end', () => {
            const bodyAsObject = JSON.parse(body)
            console.log('Body:', bodyAsObject);
            bodyAsObject.price += 1;
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.write(JSON.stringify(bodyAsObject));
            res.end();
        });
    }
}).listen(3000)