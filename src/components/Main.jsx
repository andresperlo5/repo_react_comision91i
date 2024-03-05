import { useEffect, useState } from "react";
import Image from "./Image";
import CardC from "./CardC";
import { Col, Container, Row } from "react-bootstrap";
import { useFakeStore } from "../helpers/userStatics";

const Main = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const data = await useFakeStore();
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  const url =
    "https://st.depositphotos.com/1899425/1623/i/450/depositphotos_16232649-stock-photo-moraine-lake-sunrise-colorful-landscape.jpg";

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Image urlImagen={url} ancho={"100%"} alternativo={"lindo paisaje"} />
      <Container className="mt-5">
        <Row>
          {products.map((product) => (
            <Col sm="12" md="4" lg="3" className="mt-3" key={product.id}>
              <CardC
                idProd={product.id}
                img={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Main;
