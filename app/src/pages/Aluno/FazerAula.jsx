import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'; // Adicionamos useEffect
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';

const enunciado = { "enunciado": "Algum enunciado pro aluno ler." };
const alternativas = [
    { id: 1, resposta: "Essa e a resposta correta", correto: true },
    { id: 2, resposta: "Essa e a resposta errada", correto: false },
    { id: 3, resposta: "Essa e a resposta errada", correto: false },
    { id: 4, resposta: "Essa e a resposta errada", correto: false }
];

function FazerAula() {
    const { id, id_exercicio } = useParams(); // Agora pegamos id (aula) e id_exercicio da URL
    const navigate = useNavigate();
    const [checked, setChecked] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);
    const [respostaCorreta, setRespostaCorreta] = useState(null);

    // Reseta o estado quando o id_exercicio muda
    useEffect(() => {
        setChecked({});
        setIsSubmited(false);
        setRespostaCorreta(null);
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

                    {/* Alternativas */}
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

                    {/* Botão de Submit */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
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
                    </div>

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