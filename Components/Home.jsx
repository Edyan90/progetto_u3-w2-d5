import { Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import MyCard from "./MyCards";

const Home = (props) => {
  const [searchForm, setSearchForm] = useState("");
  const city = searchForm.toLowerCase();
  console.log(city);
  return (
    <Container>
      <Row className="mt-5">
        <Col className=" d-flex justify-content-center">
          <h1>Weather Application</h1>
        </Col>
      </Row>
      <Form inline className="mb-5">
        <Row className="justify-content-center">
          <Col sm={6}>
            <Form.Control
              onSubmit={props.setCity(searchForm)}
              type="text"
              placeholder="Find your city"
              className="mt-5"
              value={searchForm}
              onChange={(evento) => {
                setSearchForm(evento.target.value);
                evento.preventDefault();
              }}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                props.searchFunc(value);
              }}
              type="submit"
              value="Submit"
              variant="outline-success"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <MyCard />
        </Col>
        <Col>
          <MyCard />
        </Col>
        <Col>
          <MyCard />
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
