import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import clienteAxios from "../helpers/clienteAxios";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const allProducts = await clienteAxios.get("/products");
    setProducts(allProducts.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="w-75 mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.precio}</td>
                <td className="text-center">
                  <img src={product.image} alt="" width={25} />
                </td>
                <td>
                  <button className="btn btn-warning mx-2">Editar</button>
                  <button className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminProductsPage;
