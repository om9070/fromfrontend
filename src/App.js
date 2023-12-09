import './App.css';
import Formdata from './component/Formdata';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from './component/Table';


function App() {
  return (
    <>
    {/* <Formdata/> */}

    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Formdata />}></Route>
        <Route path="/table" element={<Table />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
