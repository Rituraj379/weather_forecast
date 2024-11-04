    const button = document.getElementById("search-button");
    const cityInput = document.getElementById("city_input");
    const city = document.getElementById("city");
    const time = document.getElementById("time");
    const temp = document.getElementById("temp");
    const feels_c = document.getElementById("feels_c");
    const humidity = document.getElementById("humidity");

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
            city.innerText = `${result.location.name}`;
            time.innerText = `${result.location.localtime}`;
            temp.innerText = `${result.current.temp_c} °C`;
            feels_c.innerText = `Feels like: ${result.current.feelslike_c} °C`;
            humidity.innerText = `Humidity: ${result.current.humidity}%`;
        } else {
            city.innerText = "Data not available";
            time.innerText = "";
            temp.innerText = "";
            feels_c.innerText = "";
            humidity.innerText = "";
        }
    });

