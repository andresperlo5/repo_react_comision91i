import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editProd, setEditProd] = useState({
    nombre: "",
    precio: "",
    codigo: "",
  });
  const [image, setImage] = useState({});

  const editProduct = (product) => {
    setEditProd(product);
    setShow(true);
  };

  const handleChangeImage = (ev) => {
    setImage(ev.target.files[0]);
  };

  const handleChange = (ev) => {
    setEditProd({ ...editProd, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    console.log(image);
    const formData = new FormData();

    formData.append("nombre", editProd.nombre);
    formData.append("precio", editProd.precio);
    formData.append("codigo", editProd.codigo);
    formData.append("image", image);

    const updateProd = await clienteAxios.put(
      `/products/${editProd._id}`,
      { formData },
      config
    );

    console.log(updateProd);
  };

  const handleClose = () => setShow(false);

  const getProducts = async () => {
    const allProducts = await clienteAxios.get("/products");
    setProducts(allProducts.data.products);
  };

  const handleClickDel = async (idProd) => {
    try {
      const confirmDel = confirm(
        "Estas seguro de que quieres eliminar este producto?"
      );

      if (confirmDel) {
        console.log(editProd);
        const delProd = await clienteAxios.delete(
          `/products/${idProd}`,
          config
        );

        if (delProd.status === 200) {
          handleClose();
          alert("Producto Eliminado");
          location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
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
              <th>Precio</th>
              <th>Codigo</th>
              <th>Imagen</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td>{product.codigo}</td>
                <td className="text-center">
                  <img src={product.image} alt="" width={25} />
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => editProduct(product)}>
                    Editar
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            name="nombre"
                            type="text"
                            placeholder="Enter email"
                            value={editProd.nombre}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Precio</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter email"
                            name="precio"
                            value={editProd.precio}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Codigo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="codigo"
                            value={editProd.codigo}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="file"
                            placeholder="Enter email"
                            name="image"
                            onChange={(ev) => setImage(ev.target.files[0])}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleClick}>
                          Guardar
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDel(product._id)}>
                    Eliminar
                  </button>
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
