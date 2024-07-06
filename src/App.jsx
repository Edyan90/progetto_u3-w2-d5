import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Home from "../Components/Home";
import Details from "../Components/Details";
import NotFound from "../Components/NotFound";
import { useState } from "react";

const App = () => {
  const backgroundImage = "https://c.wallhere.com/photos/34/42/sky-51200.jpg!d";
  const [city, setCity] = useState("");
  const [location, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  console.log(weather);

  const lon = location.lon;
  const lat = location.lat;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchLocation();
  };
  const fetchLocation = () => {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=cb321e9bc6bc169020f26159e8235d1a")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nel reperimento dati Lat/Lon");
        }
      })
      .then((data) => {
        console.log("dati:", data);
        setLocation(data);
      })
      .catch((err) => alert(err));
  };

  const fetchCity = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2149aa4862ffbcae01121ed8b2e16068`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nel reperimento meteo città");
        }
      })
      .then((meteo) => {
        console.log("meteo città:", meteo);
        setWeather(meteo);
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh", backgroundSize: "cover", color: "white" }}
    >
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home handleFormSubmit={handleFormSubmit} setCity={setCity} />} />
          <Route path="/details/:id" element={<Details fetchCity={fetchCity} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
