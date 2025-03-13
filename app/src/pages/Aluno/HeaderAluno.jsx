import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoBranco from '../../components/img/logoBranco.png';


const HeaderAgente = () => {
  const location = useLocation(); // Hook para obter a localização atual

  /**
   * Função para determinar a classe do link ativo com base no caminho atual.
   * @param {string} path - O caminho do link.
   * @returns {string} - A classe CSS 'active' se o caminho corresponder à localização atual.
   */
  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoBranco} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul>
          <li className={getLinkClass('/home')} style={{paddingRight:"7vh"}}> 
            <Link to="/homeAluno">Home</Link>
          </li>
          <li className={getLinkClass('/login')} style={{paddingRight:"3vh"}}>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between; /* Espaça a logo e os links */
          align-items: center; /* Alinha os itens verticalmente no centro */
          background-color: #B9171C;
          padding: 10px 20px;
        }

        .logo-container {
          display: flex;
          justify-content: flex-start; /* Logo à esquerda */
        }

        .logo {
          width: 150px;
          height: auto;
        }

        nav ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        nav li {
          margin-left: 20px; /* Espaço entre os links */
        }

        nav li a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }

        nav li a:hover {
          text-decoration: underline;
        }

        nav .active a {
          font-weight: bold;
          color: #FFD700; /* Cor para o link ativo */
        }
      `}</style>
    </header>
  );
};

export default HeaderAgente;
