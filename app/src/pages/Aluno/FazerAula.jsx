import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';


const enunciado = {"enunciado": "Algum enunciado pro aluno ler."}
const alternativas = [
    {id: 1, resposta: "Essa e a resposta correta", correto: true},
    {id: 2, resposta: "Essa e a resposta errada", correto: false},
    {id: 3, resposta: "Essa e a resposta errada", correto: false},
    {id: 4, resposta: "Essa e a resposta errada", correto: false}
]

function FazerAula() {
    const { id } = useParams(); // Pega o parâmetro 'id' da URL

    // Agora você pode usar o 'id' para buscar os dados ou fazer outras operações
    console.log('ID da aula:', id);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <div className='container' style={{ display: "flex", paddingTop:"0%", width: '80%', height: '80%', flexDirection: 'column', borderRadius: '10px', alignItems: 'start', backgroundColor: '#ebebeb'}}>
            <div style={{width: '100%', backgroundColor: 'red', paddingBottom: '2%', paddingTop: '2%', borderRadius: '10px'}}>
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
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={alternativa.resposta} />
                        </FormGroup>
                    
                    ))}

                    <Button sx={{marginTop: '10%'}} variant='contained' color='error' >Submit</Button>                    

                </div>
            </div>
        </div>
    );
}

export default FazerAula
