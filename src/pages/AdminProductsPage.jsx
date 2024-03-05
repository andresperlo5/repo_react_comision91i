import Table from "react-bootstrap/Table";

const AdminProductsPage = () => {
  const productsLocalStorage =
    JSON.parse(localStorage.getItem("products")) || [];

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
            {productsLocalStorage.map((product) => (
              <tr>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
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
