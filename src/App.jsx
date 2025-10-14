import {Route, Routes} from "react-router-dom";
import Quiz from "./pages/Outils_16";
import Quiz_21 from "./pages/Metrique_21_22";
import Home from "./pages/Home";
import Processus from "./pages/Processus_1_1";
import Processus2 from "./pages/processus";
import Quiz_23 from "./pages/GestionDefaut_23";
import Dashboard from "./pages/Dashboard";
import Home1 from "./pages/foundation/Home1";
import Quiz_testfoudation from "./pages/foundation/TestFoudation_1";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Dashboard/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/home1" element={<Home1/>} />
      <Route path="/1.6" element={<Quiz/>} />
      <Route path="/2.1" element={<Quiz_21/>} />
      <Route path="1.1" element={<Processus/>} />
      <Route path="2.3" element={<Quiz_23/>} />
      <Route path="processus" element={<Processus2/>} />
      <Route path="/foundation1" element={<Quiz_testfoudation/>} />

      
      
    </Routes>
  );
}
export default App;