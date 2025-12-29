const Koa = require('koa')
const loadConfig = require('../config/config')
const cors = require('@koa/cors');

class Server {

    constructor() {
        this.app = new Koa()
    }

    start() {
        this._connect()
    }

    async _connect() {
        await this._attachAllowHeaders(this.app)
        await this.initializeRoutes()
        this.port = loadConfig.port
        await this.listen(this.port)
    }

    async initializeRoutes() {
        const Route = require('../router/index');
        Route.create(this.app)
    }

    async _attachAllowHeaders(app) {
        app.use(cors({
            origin: loadConfig.clientAddress,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }

    async listen(port) {
        this.app.listen(port, () => {
            console.log(`Server Running on Port ${port}`)
        })
    }

}

module.exports = new Server()