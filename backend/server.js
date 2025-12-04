const http = require('http')
const dotenv = require("dotenv");
dotenv.config()
const app = require("./src/app");

const server = http.createServer(app);

server.listen(process.env.PORT||3000,()=>{
    console.log(`Server running on Port ${process.env.PORT}`)
})
