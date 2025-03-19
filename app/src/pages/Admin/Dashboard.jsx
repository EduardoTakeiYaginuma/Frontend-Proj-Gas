import React, { useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import HeaderAdmin from './HeaderAdmin';
import './static/Dashboard.css';

export default function Dashboard() {
    const [dashboardData] = useState({
        media_notas_por_aula: [
            { aula_id: 1, media_notas: 7.5 },
            { aula_id: 2, media_notas: 8.2 },
            { aula_id: 3, media_notas: 6.9 },
            { aula_id: 4, media_notas: 7.8 },
        ],
        distribuicao_notas: [
            { nota: 'A', quantidade_alunos: 10 },
            { nota: 'B', quantidade_alunos: 15 },
            { nota: 'C', quantidade_alunos: 8 },
            { nota: 'D', quantidade_alunos: 5 },
        ],
        desempenho_alunos: [
            { aluno_id: 1, media_notas: 8.5 },
            { aluno_id: 2, media_notas: 7.2 },
            { aluno_id: 3, media_notas: 9.1 },
            { aluno_id: 4, media_notas: 6.8 },
        ],
    });

    const COLORS = ['#007bff', '#FBD542', '#008000', '#05263E'];

    return (
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
