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

// // This will create a server and send any information back to any request.
const server = http.createServer((req, res) => {
    if (req.url === "/"){
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end("Home Page")
    } else if (req.url === "/about"){
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end("About Page")
    } else if (req.url === "/api"){
        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({
            firstName : "Nathan",
            lastName : "Sharp"
        }))
    } else {
        res.writeHead(404)
        res.end("Page not found")
    }
});

// This will initialize the server and put it on port 3000
server.listen(2000, () => {
    console.log("Server running on port 3000");
})