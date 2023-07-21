import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    axios
      .post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert('restaurante cadastrado com sucesso!');
      });
  }
  return (
    <form
      onSubmit={(evento) => {
        aoSubmeterForm(evento);
      }}
    >
      <TextField
        id="standard-basic"
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
        label="Nome do restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
}
