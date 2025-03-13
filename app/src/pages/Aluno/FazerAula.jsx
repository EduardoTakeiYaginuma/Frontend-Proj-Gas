import { useParams } from 'react-router-dom';

function FazerAula() {
    const { id } = useParams(); // Pega o parâmetro 'id' da URL

    // Agora você pode usar o 'id' para buscar os dados ou fazer outras operações
    console.log('ID da aula:', id);

    return (
        <div>
            {/* Seu conteúdo do Dashboard */}
            <h2>Fazendo Aula {id}</h2>
        </div>
    );
}

export default FazerAula
