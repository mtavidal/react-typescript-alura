import { Box, Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../interfaces/IRestaurante';
import api from '../../lib/axios';

export default function FormularioRestaurante() {
  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      api
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (parametros.id) {
      api
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        });
    } else {
      api
        .post('restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        });
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          id="standard-basic"
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
