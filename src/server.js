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
    return res.render("index.html", {title: "Um título"})

})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")

})

server.get("/search", (req, res) => {
    return res.render("search-results.html")

})

//Por exemplo ligar o servidor
server.listen(3000)