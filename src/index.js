const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();



server.get('*', (req, res)=>{

    const Router = require('vue-router');
    const routes = require("./server/api-routes/routes");


    Vue.use(Router);

    const router = new Router({
        routes
    });

    const app = new Vue({
        router,
        data:{
            url: req.url,
            pageTitle: 'Home',
            mainTitle: 'Hello World!'
        },
        template: require('fs').readFileSync(__dirname + '/server/index.template.html', 'utf-8')

    })

    renderer.renderToString(app, (err, html)=>{
        res.end(html);
    })
})


const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log('Port: ', port);
})
