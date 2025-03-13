import React from 'react';
import HeaderAdmin from '../Admin/HeaderAdmin';
import CasosTable from '../Admin/ListaAulas';


/**
 * Componente de página inicial para a área administrativa.
 * Exibe o cabeçalho e a tabela de casos.
 */
function HomeAdmin() {
    return (
        <div className="home-admin">
            <HeaderAdmin /> {/* Componente de cabeçalho */}

            <CasosTable /> {/* Componente que exibe a tabela de casos */}

        </div>
    );
}

export default HomeAdmin;
