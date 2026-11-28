# GardenCast – Weather-Aware Gardening API

## Overview

GardenCast is a lightweight Express.js API that provides gardening recommendations based on weather conditions and plant information.

It accepts weather data such as city, temperature, humidity, and expected rainfall, then generates simple recommendations to help users make better watering and plant-care decisions.

## Features

- Custom request ID middleware to uniquely identify incoming requests.
- Request logging with HTTP method, URL, status code, and response duration.
- Input validation for all required weather and plant fields.
- Centralized error handling with consistent JSON responses.
- Rule-based gardening recommendations.
- Automated tests using Node.js's built-in test runner.

## Tech Stack

- Node.js
- Express.js
- Node.js built-in test runner (`node:test`)
- Fetch API

## Project Structure

```text
Day-4/
├── middleware/
│   ├── errorHandler.js
│   └── requestLogger.js
├── routes/
│   └── gardeningRoutes.js
├── utils/
│   └── recommendations.js
├── validators/
│   └── gardenValidator.js
├── tests/
│   └── gardening.test.js
├── index.js
├── package.json
└── README.md
```

## API Endpoint

**POST** `/api/gardening/recommendations`

### Sample Request

```json
{
  "city": "Jaipur",
  "temperature": 36,
  "humidity": 25,
  "rainExpected": false,
  "plant": "Tomato"
}
```

### Successful Response

Returns a JSON response containing the city, weather information, plant, and generated gardening recommendations.

### Validation Rules

- `city`: Required, non-empty string.
- `temperature`: Number between -20 and 60.
- `humidity`: Number between 0 and 100.
- `rainExpected`: Boolean.
- `plant`: Required, non-empty string.

Invalid input returns HTTP `400 Bad Request` with a list of validation errors.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The server runs on port `5050`.

Run automated tests:

```bash
npm test
```

## Design Decisions and Trade-offs

This prototype uses user-provided weather data rather than integrating a live weather API.

This keeps the implementation lightweight, avoids external API dependencies and credentials, and makes the recommendation logic deterministic and easy to test.

The recommendation engine uses simple rule-based heuristics. These recommendations demonstrate the API workflow but are not a substitute for detailed, location-specific agricultural advice.

## Test Results

Automated tests verify:

1. Valid weather data returns gardening recommendations with HTTP `200`.
2. Invalid weather data returns validation errors with HTTP `400`.

Both tests passed during development using `npm test`.
