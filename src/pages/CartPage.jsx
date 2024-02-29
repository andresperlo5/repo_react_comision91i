import { useEffect } from "react";
import Table from "react-bootstrap/Table";

const CartPage = () => {
  const userLog = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.title = "Usuario: Carrito";
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {userLog.cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <input type="number" name="" id="" />
              </td>
              <td>
                <p>0</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CartPage;
