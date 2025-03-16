import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeaderAdmin from './HeaderAdmin';
import './static/Cadastro.css';

const cookies = new Cookies();

const EditarAula = () => {
  const token = cookies.get('token');

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: 'titulo teste',
    prazo: '2020/02/02',
    exercicios: [
      {
        enunciado: 'Enunciado atualizado',
        respostas: ['a', 'a', 'a', 'a'],
        respostasCorretas: [false, true, false, false],
      },
      {
        enunciado: 'Enunciado 2 atualizado',
        respostas: ['b', 'b', 'b', 'b'],
        respostasCorretas: [true, false, false, false],
      },
    ],
  });

  // Função para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para atualizar os dados de um exercício
  const handleExercicioChange = (index, e) => {
    const { name, value, checked } = e.target;
    const updatedExercicios = [...formData.exercicios];

    if (name === 'enunciado') {
      updatedExercicios[index].enunciado = value;
    } else if (name.startsWith('resposta')) {
      const respostaIndex = parseInt(name.split('-')[1]);
      updatedExercicios[index].respostas[respostaIndex] = value;
    } else if (name.startsWith('correta')) {
      const respostaIndex = parseInt(name.split('-')[1]);
      updatedExercicios[index].respostasCorretas[respostaIndex] = checked;
    }

    setFormData({
      ...formData,
      exercicios: updatedExercicios,
    });
  };

  // Envia os dados para atualizar a aula no backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sibae-5d2fe0c3da99.herokuapp.com/aulas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro na atualização da aula');
      alert('Aula atualizada com sucesso');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar a aula');
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="geral">
        <Grid container spacing={2} className="login-container">
          <Grid item xs={1} style={{ paddingLeft: '40px', paddingTop: '3%' }}>
            <Link to="/aulas" style={{ textDecoration: 'none', color: '#B9171C' }}>
              <ArrowBackIcon className="back-arrow" style={{ fontSize: '2rem' }} />
            </Link>
          </Grid>
          <Grid item xs={10} style={{ textAlign: 'center' }}>
            <Container maxWidth="md">
              <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#B9171C', marginBottom: 4 }}>
                  Editar Aula
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    mt: 3,
                    width: '100%',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                  }}
                >
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
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
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
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
                  />
                  {formData.exercicios.map((exercicio, index) => (
                    <Box
                      key={index}
                      sx={{
                        marginBottom: 4,
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '16px',
                        backgroundColor: '#f9f9f9',
                      }}
                    >
                      <Typography variant="h6" sx={{ marginBottom: 2}}>
                        Exercício {index + 1}
                      </Typography>
                      <TextField
                        margin="normal"
                        fullWidth
                        id={`enunciado-${index}`}
                        label="Enunciado do Exercício"
                        name="enunciado"
                        value={exercicio.enunciado}
                        onChange={(e) => handleExercicioChange(index, e)}
                        sx={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                      />
                      <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {exercicio.respostas.map((resposta, respostaIndex) => (
                          <Grid item xs={12} sm={6} key={respostaIndex}>
                            <TextField
                              margin="normal"
                              fullWidth
                              id={`resposta-${index}-${respostaIndex}`}
                              label={`Resposta ${respostaIndex + 1}`}
                              name={`resposta-${respostaIndex}`}
                              value={resposta}
                              onChange={(e) => handleExercicioChange(index, e)}
                              sx={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={exercicio.respostasCorretas[respostaIndex]}
                                  onChange={(e) => handleExercicioChange(index, e)}
                                  name={`correta-${respostaIndex}`}
                                  sx={{ color: '#B9171C', '&.Mui-checked': { color: '#B9171C' } }}
                                />
                              }
                              label="Resposta correta"
                              sx={{ color: '#555555' }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#B9171C',
                      '&:hover': { backgroundColor: '#9e1317' },
                      padding: '12px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Salvar mudanças
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

export default EditarAula;