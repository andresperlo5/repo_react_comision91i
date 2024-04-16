import { useEffect, useState } from "react";
import Image from "./Image";
import CardC from "./CardC";
import { Col, Container, Row } from "react-bootstrap";
import clienteAxios from "../helpers/clienteAxios";

const Main = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const allProducts = await clienteAxios.get("/products");
    setProducts(allProducts.data.products);
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
            <Col sm="12" md="4" lg="3" className="mt-3" key={product._id}>
              <CardC
                idProd={product._id}
                img={product.image}
                title={product.nombre}
                description={product.description}
                price={product.precio}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Main;
