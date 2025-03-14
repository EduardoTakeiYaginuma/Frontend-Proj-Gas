import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import HeaderAdmin from './HeaderAdmin';
import Cookies from 'universal-cookie';
import './static/Dashboard.css';

export default function Dashboard() {
  const [casos, setCasos] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [urgenciaData, setUrgenciaData] = useState([]);
  const [turmaData, setTurmaData] = useState([]);
  const [error, setError] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    fetch('https://sibae-5d2fe0c3da99.herokuapp.com/casos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cases');
      }
      return response.json();
    })
    .then(data => {
      setCasos(data.caso);
      processCaseData(data.caso);
    })
    .catch(error => {
      setError(error.message);
    });
  }, [token]);

  const processCaseData = (casos) => {
    const statusCounts = { 'EM ABERTO': 0, 'FINALIZADO': 0 };
    const urgenciaCounts = { 'ALTA': 0, 'MEDIA': 0, 'BAIXA': 0, 'NAO INFORMADO': 0 };
    const turmaCounts = {};

    casos.forEach(caso => {
      statusCounts[caso.status]++;
      urgenciaCounts[caso.urgencia]++;
      const turma = caso.aluno.turma;
      if (!turmaCounts[turma]) {
        turmaCounts[turma] = 0;
      }
      turmaCounts[turma]++;
    });

    const statusData = Object.keys(statusCounts).map(key => ({
      name: key,
      value: statusCounts[key]
    }));

    const urgenciaData = Object.keys(urgenciaCounts).map(key => ({
      name: key,
      value: urgenciaCounts[key]
    }));

    const turmaData = Object.keys(turmaCounts).map(key => ({
      name: key,
      value: turmaCounts[key]
    }));

    setStatusData(statusData);
    setUrgenciaData(urgenciaData);
    setTurmaData(turmaData);
  };

  const COLORS = ['#007bff', '#FBD542', '#008000', '#05263E'];

  return (
    <div style={{ backgroundColor: "#FAF7F7", minHeight: '100vh' }}>
      <HeaderAdmin />
      <Container style={{ padding: '2%', maxWidth: '90%', margin: 'auto' }}>
        <Typography 
          variant="h4" 
          style={{ 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            textAlign: 'center', 
            marginBottom: '20px', 
            color: '#B9171C' 
          }}
        >
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Total de Casos */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ borderRadius: '10px', padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
              <Typography variant="h6" style={{ fontFamily: 'Tahoma, sans-serif', fontWeight: '500', color: '#000' }}>
                Total de Casos: {casos.length}
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Status dos Casos */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ borderRadius: '10px', padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
              <Typography variant="h5" style={{ marginBottom: '20px', fontFamily: 'Tahoma, sans-serif', fontWeight: '500', color: '#000' }}>
                Status dos Casos
              </Typography>
              <PieChart width={300} height={300}>
                <Pie dataKey="value" data={statusData} cx={150} cy={150} outerRadius={80} label>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend align="center" verticalAlign="bottom" layout="horizontal" iconType="circle" wrapperStyle={{ paddingTop: 10 }} />
              </PieChart>
            </Paper>
          </Grid>

          {/* Gráfico de Prioridade dos Casos */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ borderRadius: '10px', padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
              <Typography variant="h5" style={{ marginBottom: '20px', fontFamily: 'Tahoma, sans-serif', fontWeight: '500', color: '#000' }}>
                Prioridade dos Casos
              </Typography>
              <PieChart width={300} height={300}>
                <Pie dataKey="value" data={urgenciaData} cx={150} cy={150} outerRadius={80} label>
                  {urgenciaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend align="center" verticalAlign="bottom" layout="horizontal" iconType="circle" wrapperStyle={{ paddingTop: 10 }} />
              </PieChart>
            </Paper>
          </Grid>

          {/* Gráfico de Casos por Turma */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ borderRadius: '10px', padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
              <Typography variant="h5" style={{ marginBottom: '20px', fontFamily: 'Tahoma, sans-serif', fontWeight: '500', color: '#000' }}>
                Casos por Turma
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: turmaData.map(item => item.name) }]}
                  series={[{ data: turmaData.map(item => item.value) }]}
                  width={600}
                  height={400}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}