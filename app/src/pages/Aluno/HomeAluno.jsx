import React from 'react';
import HeaderAluno from './HeaderAluno';
import CasosTable2 from './ListaAulas'
import './static/HomeAluno.css';

function HomeAluno() {
    return (
        <div className="home-Aluno">
            <HeaderAluno />
            <CasosTable2 /> {/* Utilizando o componente CasosTable */}
        </div>
    );
}

export default HomeAluno;