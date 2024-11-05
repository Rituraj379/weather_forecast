const button = document.getElementById("search-button");
const cityInput = document.getElementById("city_input");
const city = document.getElementById("city");
const time = document.getElementById("time");
const temp = document.getElementById("temp");
const feels_c = document.getElementById("feels_c");
const humidity = document.getElementById("humidity");
const iconContainer = document.getElementById("imgg");

async function getData(cityName) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=bcd4d08ab94842dc8d955531240411&q=${cityName}&aqi=yes`
        );

        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

button.addEventListener("click", async () => {
    const value = cityInput.value;
    const result = await getData(value);

    if (result) {
        city.innerText = `City: ${result.location.name}`;
        time.innerText = `Date & Time: ${result.location.localtime}`;
        temp.innerText = `Temperature: ${result.current.temp_c} °C`;
        feels_c.innerText = `Feels like: ${result.current.feelslike_c} °C`;
        humidity.innerText = `Humidity: ${result.current.humidity}%`;

        // Clear previous icon if exists
        iconContainer.innerHTML = "";

        // Create new icon image
        const iconUrl = `https:${result.current.condition.icon}`;
        const img = document.createElement("img");
        img.src = iconUrl;
        img.alt = "Weather icon";
        iconContainer.appendChild(img);
    } else {
        city.innerText = "Data not available";
        time.innerText = "";
        temp.innerText = "";
        feels_c.innerText = "";
        humidity.innerText = "";
        iconContainer.innerHTML = ""; // Clear icon if data is not available
    }
});
