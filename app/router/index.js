const Router = require('koa-router');
const apiRoute = require('./api/index')
const bodyParser = require("koa-bodyparser");
class Route {
    constructor() {

    }

    async create(app) {
        this.app = app
        this.app.use(bodyParser());
        this.connectRoute(this.app)
    }

    async connectRoute(app) {
        const mainRouter = new Router({
            prefix: '/api'
        });
        apiRoute.forEach(({ group, route }) => {
            const router = new Router({
                prefix: group.path
            });

            route.forEach(({ path, method, handler,middleware }) => {
                const routeMiddlewares = [];

                // Group-level middleware
                if (group.middleware && group.middleware.length) {
                    group.middleware.forEach(mw => {
                        routeMiddlewares.push(mw);
                    });
                }


                // Route-level middleware
                if (middleware) {
                    middleware.forEach(mw => {
                        routeMiddlewares.push(mw);
                    });
                }

                router[method](path, ...routeMiddlewares, handler);
            })
            mainRouter.use(router.routes(), router.allowedMethods());

        })
      

        app.use(mainRouter.routes()).use(mainRouter.allowedMethods());

    }

}
module.exports = new Route()