//Servidor
const express = require('express')
const server = express()

const  {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    pageSuccessInsert,
    saveClasses
} = require('./pages')


//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//inicio e config do Servidor
server
// receber os dados do req.body
.use(express.urlencoded({extended: true}))
// configurar arquivos estáticos(css, scripts, imagens)
.use(express.static("public"))
// rotas de aplicacão
.get("/", pageLanding)    
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.get("/success-insert", pageSuccessInsert)
.post("/save-classes", saveClasses)
//Porta e Start do Servidor
.listen(process.env.PORT || 5500)

