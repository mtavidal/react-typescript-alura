import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/FormularioRestaurante.tsx';
import PaginaBaseAdmin from './paginas/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/AdministracaoPratos';
import FormularioPratos from './paginas/FormularioPratos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
        <Route path="pratos/:id" element={<FormularioPratos />} />
      </Route>
    </Routes>
  );
}

export default App;
