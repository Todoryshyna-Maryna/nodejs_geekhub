const express = require('express');
const server = express();
const Vue = require('vue');
const renderer = require('vue-server-renderer');
const bodyParser = require('body-parser');
const router = require('express').Router();


// require('./server/api-routes/router');

server.use(bodyParser.json());


const bundleRenderer = renderer.createBundleRenderer(
    require('./server/ui/admin/dist/vue-ssr-server-bundle.json'),
    {
        template: require('fs').readFileSync('./src/server/ui/admin/dist/index.ssr.html', 'utf-8')
    }
)

server.use('./server/ui/admin/dist', express.static('dist'));

server.get('*', (req, res) => {
    bundleRenderer
        .renderToStream({url: req.path})
        .pipe(res);

    // res.status(200).end();
})


const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Port: ', port);
})

