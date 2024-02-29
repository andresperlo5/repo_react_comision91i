import { useEffect } from "react";
import Main from "../components/Main";
import { createSuperAdmin } from "../helpers/userStatics";

const HomePage = () => {
  useEffect(() => {
    document.title = "Pagina Principal";
    createSuperAdmin();
  }, []);

  return (
    <>
      <Main />
    </>
  );
};

export default HomePage;
