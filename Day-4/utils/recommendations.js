
function getRecommendations({ temperature, humidity, rainExpected, plant }) {
    const recommendations = [];

    if (temperature >= 35) {
        recommendations.push(
            "High temperature! Water your plants early in the morning."
        );
    } else if (temperature >= 30) {
        recommendations.push(
            "Warm weather. Monitor soil moisture regularly."
        );
    }

    if (humidity < 30) {
        recommendations.push(
            "Low humidity! Check plants for signs of moisture stress."
        );
    }

    if (rainExpected) {
        recommendations.push(
            "Rain expected. Avoid unnecessary watering."
        );
    } else {
        recommendations.push(
            "No rain expected. Maintain your regular watering schedule."
        );
    }

    recommendations.push(
        `Monitor the soil moisture around your ${plant} plant.`
    );

    return recommendations;
}

module.exports = getRecommendations;
