const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());


require('./router');


const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log('Port: ', port);
})
