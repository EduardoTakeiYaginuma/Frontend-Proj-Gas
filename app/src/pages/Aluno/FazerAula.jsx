import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';

const enunciado = {"enunciado": "Algum enunciado pro aluno ler."}
const alternativas = [
    {id: 1, resposta: "Essa e a resposta correta", correto: true},
    {id: 2, resposta: "Essa e a resposta errada", correto: false},
    {id: 3, resposta: "Essa e a resposta errada", correto: false},
    {id: 4, resposta: "Essa e a resposta errada", correto: false}
]

function FazerAula() {
    const { id } = useParams(); // Pega o parâmetro 'id' da URL
    const navigate = useNavigate();
    const [checked, setChecked] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);
    const [respostaCorreta, setRespostaCorreta] = useState(null); // Armazena a resposta correta

    const handleCheckBoxChange = (id) => {
        if (!isSubmited) {
            setChecked(prev => ({ ...prev, [id]: !prev[id]}));
        }
    };

    const handleViewClick = () => {
        setIsSubmited(true);

        // Verifica qual alternativa foi marcada e se é a correta
        const alternativaEscolhida = alternativas.find(alternativa => checked[alternativa.id]);
        
        if (alternativaEscolhida && alternativaEscolhida.correto) {
            setRespostaCorreta(alternativaEscolhida.resposta);
        } else if (alternativaEscolhida) {
            setRespostaCorreta(alternativaEscolhida.resposta);
        } else {
            setRespostaCorreta("Nenhuma alternativa selecionada.");
        }
    };


    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <div className='container' style={{ display: "flex", paddingTop:"0%", width: '80%', height: '80%', flexDirection: 'column', borderRadius: '10px', alignItems: 'start', backgroundColor: '#ebebeb'}}>
                <div style={{width: '100%', backgroundColor: '#B9171C', paddingBottom: '2%', paddingTop: '2%'}}>
                    <Typography 
                        variant="h4" 
                        component="h4" 
                        style={{
                            paddingTop: '2%', 
                            paddingLeft:"5%",
                            paddingBottom:"1vh",
                            fontFamily: 'Roboto, sans-serif', 
                            fontWeight: 'bold', 
                            textTransform: 'uppercase',
                        }}
                    >
                        Exercicio {id}
                    </Typography>
                </div>
                <Typography
                    variant='h6'
                    style={{
                        paddingLeft: '5%',
                        paddingTop: '3%'
                    }}
                >
                    {id}) {enunciado.enunciado}
                </Typography>
                
                <div className='botoes' style={{display: 'flex', flexDirection: 'column', marginTop: '20px', paddingLeft: '5%', paddingTop: '3%'}}>
                    {alternativas.map((alternativa) => (
                        <FormGroup key={alternativa.id}>
                            <FormControlLabel 
                                control={<Checkbox checked={!!checked[alternativa.id]} onChange={() => handleCheckBoxChange(alternativa.id)} disabled={isSubmited}/>} 
                                label={alternativa.resposta} 
                            />
                        </FormGroup>
                    ))}
                    
                    <Button sx={{marginTop: '10%'}}
                            variant='contained'
                            color='error'
                            onClick={handleViewClick}>Submit
                    </Button>

                    {isSubmited && (
                        <Typography variant='h6' style={{ marginTop: '10px', color: 'green' }}>
                            {respostaCorreta}
                        </Typography>
                    )}

                <div style={{paddingTop: '15%'}}>
                    <a href={'/fazer/aula/' + (parseInt(id, 10) - 1)} style={{margin: '5px', backgroundColor: 'red', textDecoration: 'none', fontWeight: '800', padding: '10px', borderRadius: '50px', color: 'white'}}>←</a>
                    <a href={'/fazer/aula/' + (parseInt(id, 10) + 1)} style={{margin: '5px', backgroundColor: 'red', textDecoration: 'none', fontWeight: '800', padding: '10px', borderRadius: '50px', color: 'white'}}>→</a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default FazerAula;
