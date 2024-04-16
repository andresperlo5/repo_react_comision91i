import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import clienteAxios, { config } from "../helpers/clienteAxios";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const getAllCart = async () => {
    const getCart = await clienteAxios.get("/carts", config);
    setCart(getCart.data.cart.products);
  };

  useEffect(() => {
    document.title = "Usuario: Carrito";
  }, []);

  useEffect(() => {
    getAllCart();
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
          {cart.map((product) => (
            <tr key={product._id}>
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
