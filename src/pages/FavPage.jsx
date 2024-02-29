import { Col, Container, Row } from "react-bootstrap";
import CardC from "../components/CardC";
import { useEffect } from "react";

const FavPage = () => {
  const userLog = JSON.parse(localStorage.getItem("user")) || "";

  useEffect(() => {
    document.title = "Usuario: Favoritos";
  }, []);
  return (
    <>
      <Container>
        <Row>
          {userLog.fav.map((product) => (
            <Col sm="12" md="6" lg="4">
              <CardC
                idProd={product.id}
                img={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                idPage={"fav"}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default FavPage;
