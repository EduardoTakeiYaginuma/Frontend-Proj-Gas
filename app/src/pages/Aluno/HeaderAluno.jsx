import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoBranco from '../../components/img/logoBranco.png';

const HeaderAluno = () => {
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
          <li className={getLinkClass('/home')}>
            <Link to="/homeAluno">Home</Link>
          </li>
          <li className={getLinkClass('/login')}>
            <Link to="/login" className="logout-link">Logout</Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #B9171C;
          padding: 15px 40px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
        }

        .logo-container {
          display: flex;
          justify-content: flex-start;
        }

        .logo {
          width: 150px;
          height: auto;
          transition: transform 0.3s ease; /* Efeito de transição na logo */
        }

        .logo:hover {
          transform: scale(1.05); /* Efeito de zoom ao passar o mouse */
        }

        nav ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        nav li {
          margin-left: 30px; /* Espaço entre os links */
        }

        nav li a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 5px;
          transition: all 0.3s ease; /* Transição suave para hover */
        }

        nav li a:hover {
          background-color: rgba(255, 255, 255, 0.1); /* Fundo sutil ao passar o mouse */
          text-decoration: none;
        }

        nav .active a {
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.2); /* Fundo mais destacado para o link ativo */
          text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.7);
        }

        .logout-link {
          border: 2px solid white; /* Borda para o botão de logout */
          padding: 8px 20px;
          border-radius: 25px; /* Bordas arredondadas */
          transition: all 0.3s ease;
        }

        .logout-link:hover {
          background-color: white;
          color: #B9171C; /* Mudança de cor ao passar o mouse */
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            padding: 15px;
          }

          .logo-container {
            margin-bottom: 15px;
          }

          nav ul {
            flex-direction: column;
            align-items: center;
          }

          nav li {
            margin: 10px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderAluno;