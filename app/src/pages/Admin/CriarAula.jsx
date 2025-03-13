import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Container, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import HeaderAdmin from './HeaderAdmin';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './static/Cadastro.css';

const cookies = new Cookies();

const CriarAula = () => {
  const token = cookies.get('token');

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    prazo: '',
    exercicios: [],
  });

  // Função para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para adicionar um exercício
  const handleAddExercicio = () => {
    const newExercicio = {
      enunciado: '',
      respostas: ['', '', '', ''],
      respostasCorretas: [false, false, false, false],
    };

    setFormData({
      ...formData,
      exercicios: [...formData.exercicios, newExercicio],
    });
  };

  // Função para atualizar os dados de um exercício
  const handleExercicioChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExercicios = [...formData.exercicios];
    if (name === 'enunciado') {
      updatedExercicios[index].enunciado = value;
    } else if (name.startsWith('resposta')) {
      const respostaIndex = parseInt(name.split('-')[1]);
      updatedExercicios[index].respostas[respostaIndex] = value;
    } else if (name.startsWith('correta')) {
      const respostaIndex = parseInt(name.split('-')[1]);
      updatedExercicios[index].respostasCorretas[respostaIndex] = e.target.checked;
    }

    setFormData({
      ...formData,
      exercicios: updatedExercicios,
    });
  };

  // Função para tratar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const aulaData = {
      titulo: formData.titulo,
      prazo: formData.prazo,
      exercicios: formData.exercicios,
    };

    try {
      // Faz a requisição para cadastrar a aula
      const response = await fetch('https://sibae-5d2fe0c3da99.herokuapp.com/aulas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(aulaData),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      console.log('Aula cadastrada com sucesso:', data);
      alert('Aula cadastrada com sucesso');
      
      // Reseta o formulário
      setFormData({
        titulo: '',
        prazo: '',
        exercicios: [],
      });
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar aula');
    }
  };

  return (
    <div>
      <HeaderAdmin />
      
      <div className="geral">
        <Grid container spacing={2} className="login-container">
          <Grid item xs={1} style={{ paddingLeft: '40px', paddingTop: '3%' }}>
            <Link to="/aulas" style={{ textDecoration: 'none', color: '#007bff' }}>
              <ArrowBackIcon className="back-arrow" />
            </Link>
          </Grid>
          <Grid item xs={10} style={{ textAlign: 'center' }}>
            <br />
            <Container maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Nova Aula
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="titulo"
                    label="Título da Aula"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    autoComplete="titulo"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="prazo"
                    label="Prazo"
                    name="prazo"
                    value={formData.prazo}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {formData.exercicios.map((exercicio, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id={`enunciado-${index}`}
                        label="Enunciado do Exercício"
                        name="enunciado"
                        value={exercicio.enunciado}
                        onChange={(e) => handleExercicioChange(index, e)}
                      />
                      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                        {exercicio.respostas.map((resposta, respostaIndex) => (
                          <Grid item xs={6} key={respostaIndex}>
                            <TextField
                              margin="normal"
                              fullWidth
                              id={`resposta-${index}-${respostaIndex}`}
                              label={`Resposta ${respostaIndex + 1}`}
                              name={`resposta-${respostaIndex}`}
                              value={resposta}
                              onChange={(e) => handleExercicioChange(index, e)}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={exercicio.respostasCorretas[respostaIndex]}
                                  onChange={(e) => handleExercicioChange(index, e)}
                                  name={`correta-${respostaIndex}`}
                                />
                              }
                              label="Resposta correta"
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={handleAddExercicio}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Adicionar Exercício
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#B9171C' }}
                  >
                    Cadastrar Aula
                  </Button>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CriarAula;
