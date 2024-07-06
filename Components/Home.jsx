import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [searchForm, setSearchForm] = useState([]);
  const [objcitycard, setObjCityCard] = useState([]);
  const cittaCards = [
    { città: "New York", Lat: "40.7127281", Lon: "-74.0060152" },
    { città: "London", Lat: "51.5073219", Lon: "-0.1276474" },
    { città: "Canberra", Lat: "-35.2975906", Lon: "149.1012676" },
    { città: "Tokyo", Lat: "35.6828387", Lon: "139.7594549" },
  ];
  const navigate = useNavigate();
  const tempKtoC = (kelvin) => Math.floor(kelvin - 273.15);

  const fetchCityHome = (latitudine, longitudine) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitudine}&lon=${longitudine}&appid=2149aa4862ffbcae01121ed8b2e16068`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nel reperimento meteo città");
        }
      })
      .then((meteo) => {
        setObjCityCard((prevObjCityCard) => [...prevObjCityCard, meteo]);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    cittaCards.forEach((citta) => {
      fetchCityHome(citta.Lat, citta.Lon);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("siamo su Home:", objcitycard);
  const getWeatherIconUrl = (iconID) => {
    return `http://openweathermap.org/img/w/${iconID}.png`;
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col className=" d-flex justify-content-center">
          <h1>Weather Application</h1>
        </Col>
      </Row>
      <Form onSubmit={props.handleFormSubmit} inline className="mb-5">
        <Row className="justify-content-center">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Find your city"
              className="mt-5"
              value={searchForm}
              onChange={(evento) => {
                setSearchForm(evento.target.value);
                props.setCity(evento.target.value); // Setta la città nel componente genitore ovvero su APP
              }}
            />
          </Col>
        </Row>
      </Form>
      <Row className="">
        {objcitycard.length > 0 &&
          objcitycard.map((city) => (
            <Col className="m-4" key={`key-${city.id}`}>
              <Card
                style={{
                  width: "18rem",
                  backgroundColor: "#215DB5",
                  color: "white",
                }}
              >
                <Card.Title className="m-1">{city.name}</Card.Title>
                <div className="d-flex justify-content-around">
                  <div className="d-flex align-items-center">
                    <img
                      alt="Weather icon"
                      src={getWeatherIconUrl(city.weather[0].icon)}
                      style={{ width: "70px", objectFit: "contain" }}
                    />
                    <h1>{tempKtoC(city.main.temp) + "°"}</h1>
                  </div>
                  <div>
                    <h6>Max: {tempKtoC(city.main.temp_max) + "°"}</h6>
                    <h6>Min: {tempKtoC(city.main.temp_min) + "°"}</h6>
                    <h6>hum: {city.main.humidity} g/m³</h6>
                    <h6>wind: {city.wind.speed} m/s</h6>
                  </div>
                </div>

                <Card.Body>
                  <Card.Text>{city.weather[0].description}</Card.Text>
                  <Button style={{ backgroundColor: "#5281C9" }} onClick={() => navigate(`/details/${city.name}`)}>
                    View for more info
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
export default Home;
