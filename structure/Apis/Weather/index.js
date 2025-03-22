module.exports = async () => {
    const apiKey = "87879be87480a4cceb87839584bba600";
    const lat = 48.00611;
    const lon = 0.199556;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        vent: data.wind.speed,
    };
}
