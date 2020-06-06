const express = require("express")
const server = express()

//Configurar pasta public

server.use(express.static("public"))



// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})







//Configurar caminhos da minha aplicação 
// Pagina inicial
// req: é requisicao
// res: resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")

})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")

})

//Por exemplo ligar o servidor
server.listen(3000)