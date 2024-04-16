import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import clienteAxios, { config } from "../helpers/clienteAxios";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  const getOneProduct = async () => {
    const getProduct = await clienteAxios.get(`/products/${params.id}`, config);
    setProduct(getProduct.data.getProduct);
  };

  const addProdFav = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));

      if (token) {
        const addProd = await clienteAxios.post(
          `/favs/${product._id}`,
          {},
          config
        );

        if (addProd.status === 200) {
          alert("Producto cargado correctamente");
        }
      } else {
        location.href = "/login";
      }
    } catch (error) {
      if (error.response.status === 422) {
        alert(error.response.data.msg);
      }
    }
  };

  const addProdCart = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));

      if (token) {
        const addProd = await clienteAxios.post(
          `/carts/${product._id}`,
          {},
          config
        );

        if (addProd.status === 200) {
          alert("Producto cargado");
        }
      } else {
        location.href = "/login";
      }
    } catch (error) {
      if (error.response.status === 422) {
        alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center mt-5 align-items-center">
        <div className="w-25 text-end me-5">
          <Image
            urlImagen={product.image}
            ancho={"50%"}
            alternativo={product.description}
          />
        </div>
        <div>
          <p className="w-50">${product.precio}</p>
          <p>{product.price}</p>
          <div className="d-flex">
            <button className="btn btn-success mx-3" onClick={addProdFav}>
              Añadir a Favoritos
            </button>
            <button className="btn btn-warning" onClick={addProdCart}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
