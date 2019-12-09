const express = require('express');
const app = express();
const path = require('path');


let router = express.Router();


router.get('/', (req, res) => {
    res.render('./../client/public/index.html');
})

app.use(router);
