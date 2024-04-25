import { Col, Container, Row } from "react-bootstrap";
import CardC from "../components/CardC";
import { useEffect, useState } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";

const FavPage = () => {
  const [favs, setFavs] = useState([]);

  const getAllFavs = async () => {
    const getFavs = await clienteAxios.get("/favs", config);
    setFavs(getFavs.data.fav.products);
  };

  useEffect(() => {
    document.title = "Usuario: Favoritos";
  }, []);

  useEffect(() => {
    getAllFavs();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {favs.map((product) => (
            <Col sm="12" md="6" lg="4" key={product._id}>
              <CardC
                idProd={product._id}
                img={product.image}
                title={product.title}
                description={product.description}
                price={product.precio}
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
