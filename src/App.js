import Header from "./Components/Header/Navbar"; 
import Content from "./Components/Content/Homepage/Content";
import Website from "./Components/Content/Website/Website";
import { NavFooter } from "./Components/Footer/FooterNav";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Content/>}/>
          <Route path='/faq' element={<Website/>}/>
        </Routes>
      <NavFooter/>
    </BrowserRouter>
    </div>
  );
}

export default App;
