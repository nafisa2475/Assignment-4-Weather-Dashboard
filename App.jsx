import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid or inactive API key.");
    }
    if (response.status === 404) {
      throw new Error("City not found. Check the spelling.");
    }
    throw new Error(data.message || "Something went wrong.");
  }

  const formatTime = (timestamp) =>
    new Date((timestamp + data.timezone) * 1000)
      .toUTCString().slice(17, 22);

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed * 3.6),
    sunrise: formatTime(data.sys.sunrise),
    sunset: formatTime(data.sys.sunset),
  };
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather(cityName) {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await getWeather(cityName);
      setWeather(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchWeather("Kolkata");
  }, []);

  return (
    <div>
      <Header />
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={() => searchWeather(city)}
      />

      {loading && <h2>Loading weather...</h2>}
      {error && <h2 className="error">{error}</h2>}

      {weather && !loading && (
        <>
          <WeatherCard weather={weather} />
          <WeatherDetails weather={weather} />
        </>
      )}
    </div>
  );
}

export default App;