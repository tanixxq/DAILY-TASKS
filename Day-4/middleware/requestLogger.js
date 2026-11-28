
const { randomUUID } = require("crypto");

function requestLogger(req, res, next) {
    const requestId = randomUUID();
    const startTime = Date.now();

    req.requestId = requestId;

    res.setHeader("X-Request-ID", requestId);

    res.on("finish", () => {
        const duration = Date.now() - startTime;

        console.log({
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });

    next();
}

module.exports = requestLogger;
