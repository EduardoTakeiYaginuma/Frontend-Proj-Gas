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

const enunciado = { "enunciado": "Algum enunciado pro aluno ler." };
const alternativas = [
    { id: 1, resposta: "Essa e a resposta correta", correto: true },
    { id: 2, resposta: "Essa e a resposta errada", correto: false },
    { id: 3, resposta: "Essa e a resposta errada", correto: false },
    { id: 4, resposta: "Essa e a resposta errada", correto: false }
];
const dica = "Esta é uma dica ou explicação sobre o exercício.Esta é uma dica ou explicação sobre o exercício.Esta é uma dica ou explicação sobre o exercício.Esta é uma dica ou explicação sobre o exercício."; // Texto da dica

function FazerAula() {
    const { id, id_exercicio } = useParams(); // Pega id (aula) e id_exercicio da URL
    const navigate = useNavigate();
    const [checked, setChecked] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);
    const [respostaCorreta, setRespostaCorreta] = useState(null);
    const [mostrarDica, setMostrarDica] = useState(false); // Controla a exibição da dica

    // Reseta o estado quando o id_exercicio muda
    useEffect(() => {
        setChecked({});
        setIsSubmited(false);
        setRespostaCorreta(null);
        setMostrarDica(false); // Reseta a exibição da dica
    }, [id_exercicio]);

    const handleCheckBoxChange = (id) => {
        if (!isSubmited) {
            setChecked(prev => ({ ...prev, [id]: !prev[id] }));
        }
    };

    const handleViewClick = () => {
        setIsSubmited(true);

        // Verifica qual alternativa foi marcada e se é a correta
        const alternativaEscolhida = alternativas.find(alternativa => checked[alternativa.id]);

        if (alternativaEscolhida && alternativaEscolhida.correto) {
            setRespostaCorreta("Resposta correta! 🎉");
        } else if (alternativaEscolhida) {
            setRespostaCorreta("Resposta incorreta. Tente novamente! ❌");
        } else {
            setRespostaCorreta("Nenhuma alternativa selecionada.");
        }
    };

    const toggleDica = () => {
        setMostrarDica(!mostrarDica); // Alterna a exibição da dica
    };

    return (
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
                        Aula {id} - Exercício {id_exercicio}
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
                        {id_exercicio}) {enunciado.enunciado}
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
                                    {dica}
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
                            {alternativas.map((alternativa) => (
                                <Grid item xs={12} key={alternativa.id}>
                                    <Card
                                        sx={{
                                            borderRadius: '10px',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: checked[alternativa.id] ? '#f0f0f0' : '#ffffff',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                    >
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={!!checked[alternativa.id]}
                                                        onChange={() => handleCheckBoxChange(alternativa.id)}
                                                        disabled={isSubmited}
                                                        color="primary"
                                                        style={{ transform: 'scale(1.2)' }}
                                                    />
                                                }
                                                label={alternativa.resposta}
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
                            onClick={() => navigate(`/fazer_aula/${id}/exercicio/${parseInt(id_exercicio, 10) - 1}`)}
                            disabled={parseInt(id_exercicio, 10) === 1} // Desabilita o botão se for o primeiro exercício
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
                            onClick={() => navigate(`/fazer_aula/${id}/exercicio/${parseInt(id_exercicio, 10) + 1}`)}
                        >
                            Próximo →
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default FazerAula;