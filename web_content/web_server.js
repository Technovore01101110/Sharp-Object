// // Api example
// const http = require("node:http");

// const server = http.createServer((req, res) => {
//     // console.log(req)

//     const superHero = {
//         firstName: "Bruce",
//         lastName: "Wayne"
//     }

//     res.writeHead(200, {"Content-type" : "application/json"});
//     res.end(JSON.stringify(superHero));
// });

// server.listen(3001, () => {
//     console.log("Server running on port 3000");
// })


// These get the libraries needed to run and display the server.
const http = require("node:http");
const fs = require("node:fs");
const fsPromises = require("fs").promises
const path = require("path");

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const encoding = contentType.startsWith('image') ? null : 'utf8';
        const data = await fsPromises.readFile(filePath, encoding);
        response.writeHead(200, {'Content-Type' : contentType});
        response.end(data);
    } catch (err){
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

// // This will create a server and send any information back to any request.
const server = http.createServer((req, res) => {
    console.log(`Url: ${req.url} | Request Type: ${req.method}`)
    
    const extension = path.extname(req.url)

    let contentType = '';

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
        : contentType === 'text/html'
            ? path.join(__dirname, 'views', req.url)
        : path.join(__dirname, req.url);

    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch(path.parse(filePath).base){
            case 'www-page.html':
                res.writeHead(301, {'Location' : '/'})
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }

    console.log(contentType)
});

// This will initialize the server and put it on port 3000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})