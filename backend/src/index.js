const express = require('express');
const expressSession = require('express-session');
const app = express();


app.use('/', (req,res) => {
    res.send("Welcome to the Express session")
})
const createAndStartServer = async () => {
    app.listen(3000 ,() => {
        console.log('Server started on port 3000');
    })
}

createAndStartServer();
