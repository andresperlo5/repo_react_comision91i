export const createSuperAdmin = () => {
  const superAdmin = {
    userName: "admin1",
    pass: "123456789",
    role: "superAdmin",
    login: false,
  };

  localStorage.setItem("superAdmin", JSON.stringify(superAdmin));
};

export const funcion2 = () => {};
