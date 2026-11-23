function WeatherDetails({ weather }) {
  return (
    <div className="details">
      <div className="detail-card">
        <h3>Humidity</h3>
        <p>{weather.humidity}%</p>
      </div>

      <div className="detail-card">
        <h3>Wind Speed</h3>
        <p>{weather.wind} km/h</p>
      </div>

      <div className="detail-card">
        <h3>Sunrise</h3>
        <p>{weather.sunrise}</p>
      </div>

      <div className="detail-card">
        <h3>Sunset</h3>
        <p>{weather.sunset}</p>
      </div>
    </div>
  );
}

export default WeatherDetails;
