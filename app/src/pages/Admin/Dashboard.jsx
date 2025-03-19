import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import HeaderAdmin from './HeaderAdmin';
import Cookies from 'universal-cookie';
import './static/Dashboard.css';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        media_notas_por_aula: [],
        distribuicao_notas: [],
        desempenho_alunos: [],
    });
    const [error, setError] = useState(null);
    const cookies = new Cookies();
    const token = cookies.get('token');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }
                return response.json();
            })
            .then((data) => {
                setDashboardData(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [token]);

    const COLORS = ['#007bff', '#FBD542', '#008000', '#05263E'];

    return (
        console.log(dashboardData),
        <div style={{ backgroundColor: '#FAF7F7', minHeight: '100vh' }}>
            <HeaderAdmin />
            <Container style={{ padding: '2%', maxWidth: '90%', margin: 'auto' }}>
                <Typography
                    variant="h4"
                    style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: '#B9171C',
                    }}
                >
                    Dashboard
                </Typography>

                <Grid container spacing={3}>
                    {/* Gráfico de Média das Notas por Aula */}
                    <Grid item xs={12} sm={6}>
                        <Paper
                            elevation={3}
                            style={{
                                borderRadius: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                backgroundColor: '#fff',
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    marginBottom: '20px',
                                    fontFamily: 'Tahoma, sans-serif',
                                    fontWeight: '500',
                                    color: '#000',
                                }}
                            >
                                Média das Notas por Aula
                            </Typography>
                            <BarChart
                                xAxis={[
                                    {
                                        scaleType: 'band',
                                        data: dashboardData.media_notas_por_aula.map((item) => `Aula ${item.aula_id}`),
                                    },
                                ]}
                                series={[
                                    {
                                        data: dashboardData.media_notas_por_aula.map((item) => item.media_notas),
                                    },
                                ]}
                                width={400}
                                height={300}
                            />
                        </Paper>
                    </Grid>

                    {/* Gráfico de Distribuição de Notas */}
                    <Grid item xs={12} sm={6}>
                        <Paper
                            elevation={3}
                            style={{
                                borderRadius: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                backgroundColor: '#fff',
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    marginBottom: '20px',
                                    fontFamily: 'Tahoma, sans-serif',
                                    fontWeight: '500',
                                    color: '#000',
                                }}
                            >
                                Distribuição de Notas
                            </Typography>
                            <PieChart width={300} height={300}>
                                <Pie
                                    dataKey="quantidade_alunos"
                                    data={dashboardData.distribuicao_notas}
                                    cx={150}
                                    cy={150}
                                    outerRadius={80}
                                    label
                                >
                                    {dashboardData.distribuicao_notas.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    align="center"
                                    verticalAlign="bottom"
                                    layout="horizontal"
                                    iconType="circle"
                                    wrapperStyle={{ paddingTop: 10 }}
                                />
                            </PieChart>
                        </Paper>
                    </Grid>

                    {/* Gráfico de Desempenho dos Alunos */}
                    <Grid item xs={12}>
                        <Paper
                            elevation={3}
                            style={{
                                borderRadius: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                backgroundColor: '#fff',
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    marginBottom: '20px',
                                    fontFamily: 'Tahoma, sans-serif',
                                    fontWeight: '500',
                                    color: '#000',
                                }}
                            >
                                Desempenho dos Alunos
                            </Typography>
                            <BarChart
                                xAxis={[
                                    {
                                        scaleType: 'band',
                                        data: dashboardData.desempenho_alunos.map((item) => `Aluno ${item.aluno_id}`),
                                    },
                                ]}
                                series={[
                                    {
                                        data: dashboardData.desempenho_alunos.map((item) => item.media_notas),
                                    },
                                ]}
                                width={600}
                                height={400}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}