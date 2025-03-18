import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Button, TextField, Container, Typography, Alert, Grid, Box } from '@mui/material';
import HeaderLogin from './headerLogin';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/img/logo.png';
import '../static/Login.css';

export default function Login() {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.usuario[4])
        cookies.set("token", data.token, { path: "/" });
        
        if (data.usuario[4] === 1) {
          navigate("/homeAdmin");
        } else if (data.usuario[4] === 0) {
          navigate("/homeAluno");
        } else {
          setError("Permissão inválida.");
        }
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setError("Credenciais não conferem. Confirme seu email e senha.");
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <div>
      <HeaderLogin />
      <div className='login-container'>
        <Grid container spacing={2} className="login-container">
          <Grid item xs={5} style={{ textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: 350, height: 150 }} />
            <Typography variant="h6" style={{ textAlign: 'justify', padding: '0 10%', marginTop: '20px' }}>
              O Grupo de Ação Social é uma entidade estudantil com foco em desenvolver, apoiar e executar projetos de âmbito social.
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <Box className="box-divider"></Box>
          </Grid>
          <Grid item xs={5} style={{ paddingRight: '90px', marginTop: '20px' }}>
            <Container>
              <div className='login-wrapper'>
                <div className='login-text'>
                  <Typography variant="h4">Login</Typography>
                  <form onSubmit={handleSubmit} style={{ opacity: "0.9", backgroundColor: "white" }}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite seu email"
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      type="password"
                      label="Senha"
                      value={senha}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      variant="outlined"
                      margin="normal"
                    />
                    <div className='login-button'>
                      <Button variant="contained" type="submit" style={{ backgroundColor: '#B9171C', marginTop: '10%' }}>
                        Entrar
                      </Button>
                    </div>
                    {error && <Alert severity="error" className='Alert'>{error}</Alert>}
                  </form>
                </div>
              </div>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
