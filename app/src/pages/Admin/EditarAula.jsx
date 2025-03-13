import { useParams } from 'react-router-dom';

function EditarAula() {
    const { id } = useParams(); // Pega o parâmetro 'id' da URL

    // Agora você pode usar o 'id' para buscar os dados ou fazer outras operações
    console.log('ID da aula:', id);

    return (
        <div>
            {/* Seu conteúdo do Dashboard */}
            <h2>Editando Aula {id}</h2>
        </div>
    );
}

export default EditarAula
