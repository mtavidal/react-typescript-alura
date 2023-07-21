import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button } from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  const carregarDados = (url: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {paginaAnterior && (
        <Button
          style={{ padding: 10, margin: 30 }}
          variant="outlined"
          onClick={() => carregarDados(paginaAnterior)}
        >
          pagina anterior
        </Button>
      )}
      {proximaPagina && (
        <Button
          style={{ padding: 10, margin: 30 }}
          variant="outlined"
          onClick={() => carregarDados(proximaPagina)}
        >
          próxima página
        </Button>
      )}
    </section>
  );
};

export default ListaRestaurantes;
