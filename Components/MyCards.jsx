import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MyCard = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Città</Card.Title>
        <Card.Text>Tempo</Card.Text>
        <Button style={{ backgroundColor: "#3B7780" }}>Vai a vedere i dettagli</Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
