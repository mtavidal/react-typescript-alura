import {
  Box,
  Button,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Link,
  Paper,
} from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

export default function PaginaBaseAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Administração</Typography>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'end',
              }}
            >
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: 'white' }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}>Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ padding: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
