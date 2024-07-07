import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Details = (props) => {
  const { id } = useParams();
  console.log(id);
  const [location, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState("");
  const [prevWeek, setPrevWeek] = useState({});
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
  ////////////////////////////////////////////
  const fetchWeek = () => {
    if (location.length > 0) {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${location[0].lat}&lon=${location[0].lon}&appid=2149aa4862ffbcae01121ed8b2e16068`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("errore nel reperimento dati Lat/Lon");
          }
        })
        .then((previsione) => {
          console.log("previsioni:", previsione);
          setPrevWeek(previsione);
          console.log("prevWeek:", prevWeek);
        })
        .catch((err) => alert(err));
    }
  };
  const timeConverter = (time) => {
    const date = new Date(time * 1000).toLocaleString();
    return date;
  };
  useEffect(() => {
    fetchLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  //////////////////////////////////SLICK/////////////////////////////

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          speed: 500,
          infinite: true,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        },
      },
    ],
  };
  ////////////////////////////////////////////////////////////////////
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
          <h1 style={{ fontSize: "80px" }}>{id}</h1>
          {weather.main && (
            <h1 style={{ fontSize: "80px", marginLeft: "auto" }}>{props.tempKtoC(weather.main.temp)} °C</h1>
          )}
        </div>
        <Row className="m-3 d-flex">
          <Col>
            <h5>Local Date: {timeConverter(weather.dt)}</h5>
          </Col>
        </Row>
        <h1 className="mb-5">Now:</h1>
        <Row className="border border-white p-3 rounded mb-5">
          {weather.main && (
            <>
              <Col>
                <h3>Temp: {props.tempKtoC(weather.main.temp)} °C</h3>
                <h3>Temp Max: {props.tempKtoC(weather.main.temp_max)} °C</h3>
                <h3>Temp Min: {props.tempKtoC(weather.main.temp_min)} °C</h3>
              </Col>
              <Col>
                <h3>Humidity: {weather.main.humidity} g/m³</h3>
                <h3>Pressure: {weather.main.pressure} KPascal</h3>
                <h3>Wind: {weather.wind.speed} m/s</h3>
              </Col>
              <Col>
                <h3>Sunset: {timeConverter(weather.sys.sunset)}</h3>
                <h3>Sunrise: {timeConverter(weather.sys.sunrise)}</h3>
              </Col>
            </>
          )}
        </Row>
        <h1 className="mb-2">Forecast:</h1>
        <Row>
          <Slider {...settings} className="px-5">
            {prevWeek.list &&
              prevWeek.list.map((objPrev, index) => (
                <Col className="m-4" key={`key-${index}`}>
                  <Card
                    style={{
                      width: "15rem",
                      backgroundColor: "#215DB5",
                      color: "white",
                    }}
                  >
                    <Card.Title className="m-1">Date: {objPrev.dt_txt}</Card.Title>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex align-items-center">
                        <img
                          alt="Weather icon"
                          src={props.getWeatherIconUrl(objPrev.weather[0].icon)}
                          style={{ width: "70px", objectFit: "contain" }}
                        />
                        <h1>{props.tempKtoC(objPrev.main.temp) + "°"}</h1>
                      </div>
                      <div>
                        <h6>Max: {props.tempKtoC(objPrev.main.temp_max) + "°"}</h6>
                        <h6>Min: {props.tempKtoC(objPrev.main.temp_min) + "°"}</h6>
                        <h6>hum: {objPrev.main.humidity} g/m³</h6>
                        <h6>wind: {objPrev.wind.speed} m/s</h6>
                      </div>
                    </div>

                    <Card.Body>
                      <Card.Text>{objPrev.weather[0].description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Slider>
        </Row>
      </Container>
    );
  }
};

export default Details;
