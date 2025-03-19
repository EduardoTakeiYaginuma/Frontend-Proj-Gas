import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help'; // Ícone de dica
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Ícone de voltar
import { Link } from 'react-router-dom';

function FazerAula() {
    const [alternativas, setAlternativas] = useState([]); // Armazena as alternativas
    const [enunciado, setEnunciado] = useState(""); // Armazena o enunciado
    const [explicacao, setExplicacao] = useState(""); // Armazena a explicação
    const { id } = useParams(); // Pega o parâmetro 'id' da URL
    const navigate = useNavigate();
    const [checked, setChecked] = useState({}); // Armazena as alternativas selecionadas
    const [isSubmited, setIsSubmited] = useState(false); // Se a questão foi submetida
    const [respostaCorreta, setRespostaCorreta] = useState(null); // Armazena a resposta correta
    const [id_exercicio, setIdExercicio] = useState(0); // Controla o índice do exercício atual
    const [mostrarDica, setMostrarDica] = useState(false); // Controla a exibição da dica
    const [totalExercicios, setTotalExercicios] = useState(0); // Armazena o total de exercícios

    const handleCheckBoxChange = (id) => {
        if (!isSubmited) {
            setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
        }
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/fazer/aula/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao buscar aula");
                return response.json();
            })
            .then((data) => {
                console.log("Resposta da API:", data[0][5]);
                let enunciado;
                try {
                    enunciado = JSON.parse(data[0][5]);
                    console.log("enunciado", enunciado);
                } catch (error) {
                    throw new Error("Erro ao parsear o enunciado");
                }
                if (data) {
                    setTotalExercicios(enunciado.length); // Define o total de exercícios
                    carregarExercicio(enunciado, id_exercicio); // Carrega o exercício atual
                } else {
                    throw new Error("Resposta inesperada da API");
                }
            })
            .catch((error) => console.error("Erro ao buscar aula:", error));
    }, [id, id_exercicio]);

    const carregarExercicio = (enunciado, index) => {
        setAlternativas(JSON.parse(enunciado[index][2])); 
        setEnunciado(enunciado[index][1] || "");
        setExplicacao(enunciado[index][3] || "");
        setRespostaCorreta(enunciado[index][4]);
        console.log(enunciado[index][4]);
    };

    const handleViewClick = () => {
        setIsSubmited(true);

        const alternativaEscolhida = alternativas.find(
            (alternativa) => checked[alternativa]
        );

        if (alternativaEscolhida) {
            if (alternativaEscolhida == respostaCorreta) {
                setRespostaCorreta("Resposta correta! " + explicacao);
            } else {
                setRespostaCorreta("Resposta errada. " + explicacao);
            }
        } else {
            setRespostaCorreta("Nenhuma alternativa selecionada.");
        }
    };

    const toggleDica = () => {
        setMostrarDica(!mostrarDica); // Alterna a exibição da dica
    };

    const handleProximoExercicio = () => {
        if (id_exercicio < totalExercicios - 1) {
            setIdExercicio(id_exercicio + 1);
            setChecked({});
            setIsSubmited(false);
            setRespostaCorreta(null);
            setMostrarDica(false);
        }
    };

    const handleExercicioAnterior = () => {
        if (id_exercicio > 0) {
            setIdExercicio(id_exercicio - 1);
            setChecked({});
            setIsSubmited(false);
            setRespostaCorreta(null);
            setMostrarDica(false);
        }
    };

    return (
        <div >
                        <Link to="/homeAluno" style={{ textDecoration: 'none', color: '#B9171C' , }}>
                <ArrowBackIcon className="back-arrow" style={{ fontSize: '2rem', }} />
            </Link>
           
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', backgroundColor: '#f0f2f5' }}>
        
            <Card sx={{ width: '90%', maxWidth: '800px', borderRadius: '15px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                {/* Cabeçalho */}
                
                <div style={{ width: '100%', backgroundColor: '#B9171C', padding: '20px', textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        component="h4"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        Exercício {id_exercicio + 1} de {totalExercicios}
                    </Typography>
                </div>

                <CardContent>
                    {/* Enunciado */}
                    <Typography
                        variant='h6'
                        style={{
                            padding: '20px 0',
                            fontWeight: '500',
                            color: '#333',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}
                    >
                        {id_exercicio + 1}) {enunciado}
                    </Typography>

                    {/* Alternativas ou Dica */}
                    {mostrarDica ? (
                        <Grid container spacing={2} style={{ padding: '0 20px' }}>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography
                                    variant='body1'
                                    style={{
                                        padding: '20px',
                                        backgroundColor: '#e8f5e9',
                                        borderRadius: '10px',
                                        marginBottom: '20px',
                                        color: '#2e7d32',
                                        fontFamily: 'Roboto, sans-serif',
                                        textAlign: 'center'
                                    }}
                                >
                                    {explicacao}
                                </Typography>
                                <Button
                                    sx={{
                                        width: '150px',
                                        fontWeight: 'bold',
                                        borderRadius: '25px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        backgroundColor: '#4CAF50',
                                        '&:hover': { backgroundColor: '#45a049' }
                                    }}
                                    variant='contained'
                                    onClick={toggleDica}
                                >
                                    ENTENDI
                                </Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} style={{ padding: '0 20px' }}>
                            {Array.isArray(alternativas) &&
                                alternativas.map((alternativa) => (
                                    <Grid item xs={12} key={alternativa}>
                                        <Card
                                            sx={{
                                                borderRadius: '10px',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: checked[alternativa] ? '#f0f0f0' : '#ffffff',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                        >
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={!!checked[alternativa]}
                                                            onChange={() => handleCheckBoxChange(alternativa)}
                                                            disabled={isSubmited}
                                                            color="primary"
                                                            style={{ transform: 'scale(1.2)' }}
                                                        />
                                                    }
                                                    label={alternativa}
                                                    style={{ color: '#333', fontSize: '1.1rem', padding: '10px' }}
                                                />
                                            </FormGroup>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    )}

                    {/* Botões de ação (Enviar Resposta e Dica) */}
                    <Grid container spacing={2} style={{ marginTop: '20px', padding: '0 20px' }}>
                        {/* Botão "Enviar Resposta" (só aparece quando a dica não está sendo exibida) */}
                        {!mostrarDica && (
                            <Grid item xs={12} md={10} style={{ display: 'flex', justifyContent: 'center', paddingLeft: '140px' }}>
                                <Button
                                    sx={{
                                        width: '200px',
                                        fontWeight: 'bold',
                                        borderRadius: '25px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        backgroundColor: '#B9171C',
                                        '&:hover': { backgroundColor: '#A01519' }
                                    }}
                                    variant='contained'
                                    onClick={handleViewClick}
                                    startIcon={<SendIcon />}
                                >
                                    Enviar Resposta
                                </Button>
                            </Grid>
                        )}

                        {/* Botão "Dica" (só aparece quando a dica não está sendo exibida) */}
                        {!mostrarDica && (
                            <Grid item xs={12} md={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    sx={{
                                        width: '150px',
                                        fontWeight: 'bold',
                                        borderRadius: '25px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        backgroundColor: '#4CAF50',
                                        '&:hover': { backgroundColor: '#45a049' }
                                    }}
                                    variant='contained'
                                    onClick={toggleDica}
                                    startIcon={<HelpIcon />}
                                >
                                    Dica
                                </Button>
                            </Grid>
                        )}
                    </Grid>

                    {/* Feedback após o submit */}
                    {isSubmited && (
                        <Typography
                            variant='h6'
                            style={{
                                marginTop: '20px',
                                color: respostaCorreta.includes("correta") ? '#4CAF50' : '#F44336',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            {respostaCorreta}
                        </Typography>
                    )}

                    {/* Navegação entre exercícios */}
                    <div style={{ marginTop: '40px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <Button
                            variant='contained'
                            sx={{
                                borderRadius: '25px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#B9171C',
                                '&:hover': { backgroundColor: '#A01519' }
                            }}
                            onClick={handleExercicioAnterior}
                            disabled={id_exercicio === 0} // Desabilita o botão se for o primeiro exercício
                        >
                            ← Anterior
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                borderRadius: '25px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#B9171C',
                                '&:hover': { backgroundColor: '#A01519' }
                            }}
                            onClick={handleProximoExercicio}
                            disabled={id_exercicio === totalExercicios - 1} // Desabilita o botão se for o último exercício
                        >
                            Próximo →
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
    );
}

export default FazerAula;