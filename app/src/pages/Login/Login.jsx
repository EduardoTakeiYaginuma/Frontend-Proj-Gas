import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Button, TextField, Container, Typography, Alert, Grid, Box } from '@mui/material';
import HeaderLogin from './headerLogin';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/img/logo.png';
import gas from '../../components/img/gas.png';
import '../static/Login.css';

/**
 * Componente de login.
 * Permite ao usuário inserir suas credenciais e realizar a autenticação.
 */
export default function Login() {
  const cookies = new Cookies(); // Instância de Cookies para gerenciar cookies
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const navigate = useNavigate(); // Hook de navegação do React Router

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://sibae-5d2fe0c3da99.herokuapp.com/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        cookies.set("token", data.token, { path: "/" }); // Armazena o token de autenticação em um cookie
        window.location.href = "/"; // Redireciona para a página inicial
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setError("Credenciais não conferem. Confirme seu email e senha."); // Exibe mensagem de erro
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um erro ao tentar fazer login."); // Exibe mensagem de erro
    }
  };

  return (
    <div>
      <HeaderLogin /> {/* Componente de cabeçalho do login */}
      <div className='login-container'>
        <Grid container spacing={2} className="login-container">
          <Grid item xs={5} style={{ textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: 350, height: 150 }} />
            
            <Typography variant="h6" component="h6" style={{ textAlign: 'justify', paddingLeft: "10%" }}>
              O Grupo de Ação Social é uma entidade estudantil comfoco em desenvolver, apoiar e executar projetos de âmbito social de forma a gerar conscientização, incentivos, comportamentos e atitudes que promovam a transformação social na comunidade
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <Box className="box-divider"></Box>
          </Grid>
          <Grid item xs={5} style={{ alignItems: "center", justifyContent: "center", paddingRight: '90px', marginTop: '20px', paddingTop: '15vh' }}>
            <Container>
              <div className='login-wrapper'>
                <div className='login-text'>
                  <Typography variant="h4" component="h1" id="login-text">Login</Typography>
                  <form onSubmit={handleSubmit} style={{ opacity: "0.9", backgroundColor: "white" }}>
                    <TextField
                      fullWidth
                      type="email"
                      name="email"
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
                      name="password"
                      label="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      variant="outlined"
                      margin="normal"
                    />
                    <div className='login-button'>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: '#B9171C', marginTop: '10%' }}
                    >
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
