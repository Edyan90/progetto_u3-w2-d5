import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Details = (props) => {
  const { id } = useParams();
  console.log(id);
  const [location, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState("");
  const fetchLocation = () => {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + id + "&appid=cb321e9bc6bc169020f26159e8235d1a")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dati Lat/Lon");
        }
      })
      .then((data) => {
        console.log("dati:", data);
        setLocation(data);
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=2149aa4862ffbcae01121ed8b2e16068`
        );
      })
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
        setIcon(meteo.weather[0].icon);
        console.log("siamo su meteo", weather);
        console.log("siamo su meteo", icon);
      })
      .catch((err) => alert(err));
  };
  const timeConverter = (time) => {
    const date = new Date(time * 1000).toLocaleString();
    return date;
  };
  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!location || !weather) {
    return <Container>Loading...</Container>;
  } else {
    console.log(location);
    console.log(weather);
    console.log(icon);
    return (
      <Container>
        <div className="d-flex">
          <img alt="Weather icon" src={props.getWeatherIconUrl(icon)} style={{ width: "80px", objectFit: "contain" }} />
          <h1 style={{ fontSize: "80px" }}>{weather.name}</h1>
          <h1 style={{ fontSize: "80px" }}>{props.tempKtoC(weather.main.temp) + "°"}</h1>
        </div>
        <Row className="ms-3 d-flex">
          <Col>
            <h5>Local Date: {timeConverter(weather.dt)}</h5>
          </Col>
          <Col>
            <h6></h6>
            <h6></h6>
            <h6></h6>
            <h6></h6>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Details;
