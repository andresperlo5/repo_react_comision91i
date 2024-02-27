import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import NavbarC from "./components/NavbarC";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <NavbarC />
      <Router>
        <RoutesViews />
      </Router>
      <Footer />
    </>
  );
};

export default App;
