function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <h1>{weather.temperature}°C</h1>
      <h3>{weather.condition}</h3>
      <p>Feels Like: {weather.feelsLike}°C</p>
    </div>
  );
}

export default WeatherCard;
