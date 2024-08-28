import './App.css';
import ProductList from"./components/products/ProductList"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ProductList/>
        <ToastContainer />
    </>
  );
}

export default App;
