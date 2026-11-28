
const express = require("express");
const gardenValidator = require("../validators/gardenValidator");
const getRecommendations = require("../utils/recommendations");

const router = express.Router();

router.post(
    "/recommendations",
    gardenValidator,
    (req, res) => {
        const { city, temperature, humidity, rainExpected, plant } = req.body;

        const recommendations = getRecommendations({
            temperature,
            humidity,
            rainExpected,
            plant
        });

        res.status(200).json({
            success: true,
            requestId: req.requestId,
            city,
            weather: {
                temperature,
                humidity,
                rainExpected
            },
            plant,
            recommendations
        });
    }
);

module.exports = router;
