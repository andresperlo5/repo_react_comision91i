import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/CardC.css";

const CardC = ({ idProd, img, title, description, price, idPage }) => {
  const deleteProdFav = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userLog = JSON.parse(localStorage.getItem("user")) || "";

    const confirmDeleteProdFav = confirm(
      "Estas seguro de que quieres eliminar a este Producto de Favoritos?"
    );

    if (confirmDeleteProdFav) {
      const userIndex = users.findIndex((user) => user.id === userLog.id);
      const productosNoBorrados = userLog.fav.filter(
        (prod) => prod.id !== idProd
      );

      users[userIndex].fav = productosNoBorrados;
      userLog.fav = productosNoBorrados;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(userLog));
      location.reload();
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
