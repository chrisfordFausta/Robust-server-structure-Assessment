const errorHandler = (error, _req, res, _next) => {
    console.log(error)
    const { status = 500, message = "Internal Server Error" } = error
    res.status(status).json({ error: message })
}

module.exports = errorHandler;