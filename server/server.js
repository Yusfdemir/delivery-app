const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require("passport")

///////
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const addressRoutes = require("./routes/addressRoutes")

//////
const port = process.env.PORT || 3010 ; 

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())
require('./config/passport')(passport)
app.disable('x-powered-by');

app.set('port', port);

//////

userRoutes(app);
categoryRoutes(app);
productRoutes(app)
addressRoutes(app)
//////

/*mobil uygulamada istek atarken ip adresine ihtiyacımız olduğu için localdeki ip adresini ekledik cmd=> ipconfig => IPv4 adressi, modem her kapanıp açıldığında bu adress değişir*/
server.listen(3010, '192.168.0.114' || 'localhost',function() {
    console.log("node.js application run on port " + port)
}) 

app.get('/',(req,res)=>{
    res.send("Rota başarılı")
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})