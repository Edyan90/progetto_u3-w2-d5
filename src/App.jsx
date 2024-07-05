import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Home from "../Components/Home";
import Details from "../Components/Details";
import NotFound from "../Components/NotFound";
import { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState([]);
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const fetchLocation = () => {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=cb321e9bc6bc169020f26159e8235d1a")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nel reperimento dati");
        }
      })
      .then((data) => {
        console.log(data);
        setLocation(data);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home handleFormSubmit={handleFormSubmit} setCity={setCity} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
