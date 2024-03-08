import { ToastContainer } from "react-toastify";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Content></Content>
      <Footer></Footer>
      <ToastContainer />
    </>
  );
}

export default App;
