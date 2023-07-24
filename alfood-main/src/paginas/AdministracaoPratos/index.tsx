import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';
import IPrato from '../../interfaces/IPrato';

export default function AdministracaoPratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    api
      .get<IPrato[]>('pratos/')
      .then((resposta) => {
        setPratos(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function excluirPratos(pratoAserExcluido: IPrato) {
    api.delete(`pratos/${pratoAserExcluido.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoAserExcluido.id
      );
      setPratos([...listaPratos]);
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                {prato.imagem !== null ? (
                  <a
                    href={prato.imagem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver imagem
                  </a>
                ) : (
                  <p>imagem indisponível</p>
                )}
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}>editar</Link> ]
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => excluirPratos(prato)}
                  variant="outlined"
                  color="error"
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
