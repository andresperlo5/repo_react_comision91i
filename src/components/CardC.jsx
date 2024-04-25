import Card from "react-bootstrap/Card";
import "../css/CardC.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const CardC = ({ idProd, img, title, description, price, idPage }) => {
  const deleteProdFav = async () => {
    const confirmDeleteProdFav = confirm(
      "Estas seguro de que quieres eliminar a este Producto de Favoritos?"
    );

    if (confirmDeleteProdFav) {
      const favDel = await clienteAxios.delete(`/favs/${idProd}`, config);
      if (favDel.status === 200) {
        alert("Produto eliminado de Favoritos");
        location.reload();
      }
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <div className="img-card">
          <Card.Img variant="top" src={img} />
        </div>
        <Card.Body>
          <Card.Title className="text-card">{title}</Card.Title>
          <Card.Text className="text-card">{description}</Card.Text>
          <Card.Text>${price}</Card.Text>
          {idPage === "fav" ? (
            <a href={"#"} className="btn btn-danger" onClick={deleteProdFav}>
              Eliminar
            </a>
          ) : (
            <a href={`/product/${idProd}`} className="btn btn-success">
              Ver Mas
            </a>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardC;
