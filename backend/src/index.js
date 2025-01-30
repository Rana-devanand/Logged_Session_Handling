const express = require('express');
const expressSession = require('express-session');
const app = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const ApiRoute = require("./routes/index")
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));
app.use('/', (req,res) => {
    res.send("Welcome to the Express session")
})

app.use("/api" , ApiRoute)
const createAndStartServer = async () => {
    app.listen(3000 ,() => {
        console.log('Server started on port 3000');
    })
}

createAndStartServer();
