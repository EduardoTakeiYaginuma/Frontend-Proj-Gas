import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

function FazerAula() {
    const [alternativas, setAlternativas] = useState([]); // Armazena as alternativas
    const [enunciado, setEnunciado] = useState(""); // Armazena o enunciado
    const [explicacao, setExplicacao] = useState("")
    const { id } = useParams(); // Pega o parâmetro 'id' da URL
    const navigate = useNavigate();
    const [checked, setChecked] = useState({}); // Armazena as alternativas selecionadas
    const [questao, setQuestao] = useState(null);
    const [isSubmited, setIsSubmited] = useState(false); // Se a questão foi submetida
    const [respostaCorreta, setRespostaCorreta] = useState(null); // Armazena a resposta correta

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
                console.log("Resposta da API:", data);
                console.log("enunciado", data[0][1]);
                if (data) {
                    setAlternativas(JSON.parse(data[0][2])); 
                    setEnunciado(data[0][1] || "");
                    setExplicacao(data[0][3] || "");
                    setRespostaCorreta(data[0][4])
                    console.log(data[0][4])
                } else {
                    throw new Error("Resposta inesperada da API");
                }
            })
            .catch((error) => console.error("Erro ao buscar aula:", error));
    }, [id]);

    const handleViewClick = () => {
        setIsSubmited(true);

        const alternativaEscolhida = alternativas.find(
            (alternativa) => checked[alternativa]
        );

        if (alternativaEscolhida) {
            if (alternativaEscolhida == respostaCorreta) {
                setRespostaCorreta("Resposta correta! " + explicacao)
            } else {
                setRespostaCorreta("Resposta errada. " + explicacao);
            }
        } else {
            setRespostaCorreta("Nenhuma alternativa selecionada.");
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
            }}
        >
            <div
                className='container'
                style={{
                    display: 'flex',
                    paddingTop: '0%',
                    width: '80vw',
                    height: '80vh',
                    flexDirection: 'column',
                    alignItems: 'start',
                    boxShadow: '2px 5px 5px grey',
                    borderRadius: '10px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        backgroundColor: '#B9171C',
                        paddingBottom: '2%',
                        paddingTop: '2%',
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h4"
                        style={{
                            paddingTop: '2%',
                            paddingLeft: '5%',
                            paddingBottom: '1vh',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: '#dcdcdc',
                        }}
                    >
                        Exercício {id_exercicio}
                    </Typography>
                </div>

                <Typography variant="h6" style={{ paddingLeft: '5%', paddingTop: '3%' }}>
                    {id}) {enunciado}
                </Typography>

                <div
                    className='botoes'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '20px',
                        paddingLeft: '5%',
                        paddingTop: '3%',
                        width: '80%',
                    }}
                >
                    {Array.isArray(alternativas) &&
                        alternativas.map((alternativa) => (
                            <FormGroup key={alternativa}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!checked[alternativa]}
                                            onChange={() => handleCheckBoxChange(alternativa)}
                                            disabled={isSubmited}
                                        />
                                    }
                                    label={alternativa} 
                                />
                            </FormGroup>
                        ))}

                    <Button
                        sx={{ marginTop: '2%', width: '20%' }}
                        variant="contained"
                        color="error"
                        onClick={handleViewClick}
                    >
                        Submit
                    </Button>

                    {/* Exibe a resposta após a submissão */}
                    {isSubmited && respostaCorreta && (
                        <Typography
                            variant="h6"
                            style={{
                                paddingTop: '2%',
                                paddingLeft: '5%',
                                color: respostaCorreta.includes('correta') ? 'green' : 'red',
                            }}
                        >
                            {respostaCorreta}
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FazerAula;
