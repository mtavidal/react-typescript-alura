import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import Itag from '../../interfaces/ITag';
import IRestaurante from '../../interfaces/IRestaurante';
import { useParams } from 'react-router-dom';
import IPrato from '../../interfaces/IPrato';

export default function FormularioPratos() {
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState<Itag[]>([]);
  const [tag, setTag] = useState('');
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      api
        .get<IPrato>(`pratos/${parametros.id}/`)
        .then((resposta) => preencherDados(resposta.data));
    }
    async function preencherDados(prato: IPrato) {
      setNomePrato(prato.nome);
      setDescricao(prato.descricao);
      setTag(prato.tag);

      try {
        const response = await api.get(`restaurantes/${prato.restaurante}/`);
        const data = await response.data.id;
        setRestaurante(`${data}`);
      } catch (error) {
        alert('Erro na requisição');
      }
    }
  }, [parametros]);

  useEffect(() => {
    api
      .get<{ tags: Itag[] }>('tags/')
      .then((resposta) => setTags(resposta.data.tags));
    api
      .get<IRestaurante[]>('restaurantes/')
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  }

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const formData = new FormData();
    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);
    if (imagem) {
      formData.append('imagem', imagem);
    }
    if (parametros.id) {
      api
        .request({
          url: `pratos/${parametros.id}/`,
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })
        .then(() => {
          setDescricao('');
          setNomePrato('');
          setTag('');
          setRestaurante('');
          alert('Prato atualizado com sucesso!');
        })
        .catch((erro) => console.log(erro));
    } else {
      api
        .request({
          url: 'pratos/',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })
        .then(() => {
          setDescricao('');
          setNomePrato('');
          setTag('');
          setRestaurante('');
          alert('Prato cadastrado com sucesso!');
        })
        .catch((erro) => console.log(erro));
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
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          id="standard-basic"
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          id="standard-basic"
          onChange={(evento) => setDescricao(evento.target.value)}
          label="Descrição"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem value={tag.value} key={tag.id}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem value={restaurante.id} key={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

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
