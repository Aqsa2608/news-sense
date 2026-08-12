import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./pages/Article";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/article" element={<Article />} />

        <Route path="/" element={<Splash />} />

        <Route path="/home" element={<Home />} />

        <Route path="/loading" element={<Loading />} />

        <Route path="/result" element={<Result />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
