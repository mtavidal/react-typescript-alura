import PaginaPadrao from 'components/PaginaPadrao';
import Menu from 'components/Menu';
import Cardapio from 'pages/Cardapio';
import Inicio from 'pages/Inicio';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function AppRouter() {
    return (
        <main>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path='/' element={<PaginaPadrao />}>
                        <Route index element={<Inicio />} />
                        <Route path='cardapio' element={<Cardapio />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}