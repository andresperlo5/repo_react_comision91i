import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import Swal from "sweetalert2";
import { useFakeStore } from "../helpers/userStatics";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  const getOneProduct = async () => {
    const data = await useFakeStore(params.id);
    setProduct(data);
  };

  const addProdFav = () => {
    const favLs = JSON.parse(localStorage.getItem("favs")) || [];
    const userLog = JSON.parse(localStorage.getItem("user")) || "";
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (userLog) {
      const prodExistFav = userLog.fav.find((prod) => prod.id === product.id);
      console.log(prodExistFav);
      if (prodExistFav) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El Producto ya existe en Favoritos!",
        });
        return;
      }
      userLog.fav.push(product);

      const userIndex = users.findIndex((user) => user.id === userLog.id);
      users[userIndex] = userLog;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(userLog));
      Swal.fire({
        title: "Felicidades!",
        text: "El Producto se cargo correctamente a los Favoritos!",
        icon: "success",
      });
    } else {
      location.href = "/login";
    }
  };

  const addProdCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userLog = JSON.parse(localStorage.getItem("user")) || "";
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (userLog) {
      const prodExistFav = userLog.cart.find((prod) => prod.id === product.id);
      console.log(prodExistFav);
      if (prodExistFav) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El Producto ya existe en el Carrito!",
        });
        return;
      }
      userLog.cart.push(product);

      const userIndex = users.findIndex((user) => user.id === userLog.id);
      users[userIndex] = userLog;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(userLog));
      Swal.fire({
        title: "Felicidades!",
        text: "El Producto se cargo correctamente al Carrito!",
        icon: "success",
      });
    } else {
      location.href = "/login";
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
          <p className="w-50">{product.description}</p>
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
