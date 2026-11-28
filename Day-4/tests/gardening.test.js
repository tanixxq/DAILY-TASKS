
const { test, before, after } = require("node:test");
const assert = require("node:assert");
const express = require("express");

const requestLogger = require("../middleware/requestLogger");
const gardeningRoutes = require("../routes/gardeningRoutes");
const errorHandler = require("../middleware/errorHandler");

let server;
let baseUrl;

before(async () => {
    const app = express();

    app.use(requestLogger);
    app.use(express.json());
    app.use("/api/gardening", gardeningRoutes);
    app.use(errorHandler);

    server = app.listen(0);

    await new Promise((resolve) => server.once("listening", resolve));

    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
});

test("valid weather data returns gardening recommendations", async () => {
    const response = await fetch(`${baseUrl}/api/gardening/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            city: "Jaipur",
            temperature: 36,
            humidity: 25,
            rainExpected: false,
            plant: "Tomato"
        })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.city, "Jaipur");
    assert.ok(data.recommendations.length > 0);
    assert.ok(response.headers.get("x-request-id"));
});

test("invalid weather data returns validation errors", async () => {
    const response = await fetch(`${baseUrl}/api/gardening/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            city: "",
            temperature: 75,
            humidity: 120,
            rainExpected: "no",
            plant: ""
        })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.strictEqual(data.success, false);
    assert.strictEqual(data.errors.length, 5);
    assert.ok(response.headers.get("x-request-id"));
});
