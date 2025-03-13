import React from 'react';
import logoBranco from '../../components/img/logoBranco.png';
import gas from '../../components/img/gas.png';

const HeaderLogin = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoBranco} alt="Logo" className="logo" style={{paddingLeft: '1vh'}} />
        <img src={gas} alt="Logo Gas" className="Gas" style={{paddingRight: '2vh'}} />
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;  /* Para alinhar verticalmente no centro */
          background-color: #B9171C;
          padding: 10px; /* Ajuste o padding conforme necessário */
        }

        .logo-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          /* Ajuste o tamanho da logo conforme necessário */
          width: 150px;  /* Ajuste o tamanho conforme necessário */
          height: auto;
        }

        .Gas {
          width: 130px;
          height: auto;
        }
      `}</style>
    </header>
  );
};

export default HeaderLogin;
