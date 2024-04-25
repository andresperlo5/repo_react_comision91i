import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import clienteAxios, { config } from "../helpers/clienteAxios";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const getAllCart = async () => {
    const getCart = await clienteAxios.get("/carts", config);
    setCart(getCart.data.cart.products);
  };

  const handleClick = async (idProd) => {
    try {
      const confirmDelProd = confirm(
        "Estas seguro de que quieres eliminar este producto del Carrito?"
      );

      if (confirmDelProd) {
        const delCart = await clienteAxios.delete(`/carts/${idProd}`, config);

        if (delCart.status === 200) {
          alert("Producto eliminado del carrito");
          location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
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
            <th>Borrar</th>
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
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClick(product._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CartPage;
