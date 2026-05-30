import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Formulario from './Pantallas/Formulario.tsx';
import RegistroQuiniela from './Pantallas/RegistroQuiniela.tsx';
import Principal from './Pantallas/Principal.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />

        <Route path="/formulario" element={<Formulario />} />

        <Route path="/registro-quiniela" element={<RegistroQuiniela />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
