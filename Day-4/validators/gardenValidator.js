
function gardenValidator(req, res, next) {
    const { city, temperature, humidity, rainExpected, plant } = req.body;

    const errors = [];

    if (typeof city !== "string" || city.trim() === "") {
        errors.push("City is required and must be a non-empty string");
    }

    if (
        typeof temperature !== "number" ||
        temperature < -20 ||
        temperature > 60
    ) {
        errors.push("Temperature must be a number between -20 and 60");
    }

    if (
        typeof humidity !== "number" ||
        humidity < 0 ||
        humidity > 100
    ) {
        errors.push("Humidity must be a number between 0 and 100");
    }

    if (typeof rainExpected !== "boolean") {
        errors.push("rainExpected must be a boolean");
    }

    if (typeof plant !== "string" || plant.trim() === "") {
        errors.push("Plant is required and must be a non-empty string");
    }

    if (errors.length > 0) {
        const error = new Error("Input validation failed");
        error.statusCode = 400;
        error.details = errors;

        return next(error);
    }

    next();
}

module.exports = gardenValidator;
