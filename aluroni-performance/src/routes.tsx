import Footer from '../src/components/Footer';
import Menu from '../src/components/Menu';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Cardapio = lazy(() => import('../src/pages/Cardapio'));
const PaginaPadrao = lazy(() => import('../src/components/PaginaPadrao'));
const Inicio = lazy(() => import('../src/pages/Inicio'));
const NotFound = lazy(() => import('../src/pages/NotFound'));
const Prato = lazy(() => import('../src/pages/Prato'));
const Sobre = lazy(() => import('../src/pages/Sobre'));

export default function AppRouter() {
  return (
    <main className="container">
      <Router>
        <Menu />
        <Suspense fallback={<p> Carregando... </p>}>
          <Routes>
            <Route path="/" element={<PaginaPadrao />}>
              <Route index element={<Inicio />} />
              <Route path="cardapio" element={<Cardapio />} />
              <Route path="sobre" element={<Sobre />} />
            </Route>
            <Route path="prato/:id" element={<Prato />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </main>
  );
}
