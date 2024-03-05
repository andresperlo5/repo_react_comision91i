export const createSuperAdmin = () => {
  const superAdmin = {
    userName: "admin1",
    pass: "123456789",
    role: "superAdmin",
    login: false,
  };

  localStorage.setItem("superAdmin", JSON.stringify(superAdmin));
};

/* Custom Hooks */
export const useFakeStore = async (idProd) => {
  if (idProd >= 0) {
    const getAllProducts = await fetch(
      `https://fakestoreapi.com/products/${idProd}`
    );
    const data = await getAllProducts.json();
    return data;
  } else {
    const getAllProducts = await fetch("https://fakestoreapi.com/products");
    const data = await getAllProducts.json();
    return data;
  }
};
