// These get the libraries needed to run and display the server.
const http = require("node:http");
const fs = require("node:fs");
const fsPromises = require("fs").promises
const path = require("path");
const get_table = require("../main/database.mjs").get_table

// Sets up a port
const PORT = process.env.PORT || 3500;

// This function writes up the response for the request.
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

// const serveApi = async (data, )

// This will create a server and send any information back to any request.
const server = http.createServer(async (req, res) => {
    
    // This displays in the console the url requested and the request type.
    console.log(`Url: ${req.url} | Request Type: ${req.method}`)
    
    // This handles api requests
    if (req.url.startsWith('/api/')){
        return handleApiRequest(req, res);
    } else if(req.url == '/data/products'){
        const data = await get_table("product")
        res.writeHead(200, {'Content-Type' : "application/json"});
        return res.end(JSON.stringify(data));
    }


    // This will grab the 
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

    if (req.url.startsWith("/product/")){
        if (req.url === "/product/"){
            serveFile(path.join(__dirname, "views", "404.html"), 'text/html',
                                res)
        } else {
            
        }
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