const ResponseMiddleware = async (ctx, next) => {

    try {

        if (ctx.method == 'OPTIONS') {
            ctx.status = 204
            return
        }

        let data = await next()

        if (!data) {
            return
        }

        ctx.body = data

    } catch (err) {

        ctx.status = err.status || 500

        ctx.body = { status: 'Failed', message: err.message || "Unknown Exception" }
    }

}

module.exports = {
    ResponseMiddleware
}