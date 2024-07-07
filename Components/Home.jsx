import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = (props) => {
  const [searchForm, setSearchForm] = useState([]);
  const [objcitycard, setObjCityCard] = useState([]);
  const cittaCards = [
    { città: "New York", Lat: "40.7127281", Lon: "-74.0060152" },
    { città: "London", Lat: "51.5073219", Lon: "-0.1276474" },
    { città: "Canberra", Lat: "-35.2975906", Lon: "149.1012676" },
    { città: "Tokyo", Lat: "35.6828387", Lon: "139.7594549" },
  ];
  ///////////////////////////////////////////////
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  const navigate = useNavigate();

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

  return (
    <Container>
      <Row className="mt-5">
        <Col className=" d-flex justify-content-center">
          <h1>Weather Application</h1>
        </Col>
      </Row>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`/details/${searchForm}`);
        }}
        inline
        className="mb-5"
      >
        <Row className="justify-content-center">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Find your city"
              className="mt-5"
              value={searchForm}
              onChange={(evento) => {
                setSearchForm(evento.target.value);
                // Setta la città nel componente genitore ovvero su APP
              }}
            />
          </Col>
        </Row>
      </Form>
      <Row className="">
        <Slider {...settings} className="px-5">
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
                        src={props.getWeatherIconUrl(city.weather[0].icon)}
                        style={{ width: "70px", objectFit: "contain" }}
                      />
                      <h1>{props.tempKtoC(city.main.temp) + "°"}</h1>
                    </div>
                    <div>
                      <h6>Max: {props.tempKtoC(city.main.temp_max) + "°"}</h6>
                      <h6>Min: {props.tempKtoC(city.main.temp_min) + "°"}</h6>
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
        </Slider>
      </Row>
    </Container>
  );
};
export default Home;
