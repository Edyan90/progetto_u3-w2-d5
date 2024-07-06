import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Home from "../Components/Home";
import Details from "../Components/Details";
import NotFound from "../Components/NotFound";

const App = () => {
  const tempKtoC = (kelvin) => Math.floor(kelvin - 273.15);
  const getWeatherIconUrl = (iconID) => {
    return `http://openweathermap.org/img/w/${iconID}.png`;
  };
  const backgroundImage = "https://c.wallhere.com/photos/34/42/sky-51200.jpg!d";
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh", backgroundSize: "cover", color: "white" }}
    >
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home tempKtoC={tempKtoC} getWeatherIconUrl={getWeatherIconUrl} />} />
          <Route path="/details/:id" element={<Details tempKtoC={tempKtoC} getWeatherIconUrl={getWeatherIconUrl} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
