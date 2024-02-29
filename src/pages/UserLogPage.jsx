import React, { useEffect } from "react";
import Main from "../components/Main";

const UserLogPage = () => {
  useEffect(() => {
    document.title = "Usuario: Pagina Principal";
  }, []);
  return (
    <>
      <Main />
    </>
  );
};

export default UserLogPage;
