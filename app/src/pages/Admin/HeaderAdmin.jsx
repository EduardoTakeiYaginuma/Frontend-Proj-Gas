import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoBranco from '../../components/img/logoBranco.png';

/**
 * Componente de cabeçalho para a área administrativa.
 * Exibe a logo, o título e os links de navegação.
 */
const HeaderAdmin = () => {
  const location = useLocation();  // Hook para obter a localização atual da rota

  /**
   * Função para determinar a classe CSS do link ativo.
   * @param {string} path - Caminho da rota.
   * @returns {string} - Retorna 'active' se o caminho da rota atual for igual ao parâmetro, caso contrário, retorna uma string vazia.
   */
  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logoBranco} alt="Logo" className="logo" />
        </div>
        <nav style={{}}>
          <ul>
            <li className={getLinkClass('/home')} style={{paddingRight:"7vh"}}>
              <Link to="/homeAdmin">Home</Link>
            </li>
            {/* <li className={getLinkClass('/alunos')}>
              <Link to="/alunos">Alunos</Link>
            </li> */}
            <li className={getLinkClass('/dashboard')} style={{paddingRight:"7vh"}}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={getLinkClass('/usuarios')} style={{paddingRight:"7vh"}}>
              <Link to="/usuarios">Usuários</Link>
            </li>
            <li className={getLinkClass('/login')} style={{paddingRight:"3vh"}}>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>

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
          text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.7); /* Sombra no texto */
        }
      `}</style>
    </>
  );
};

export default HeaderAdmin;
