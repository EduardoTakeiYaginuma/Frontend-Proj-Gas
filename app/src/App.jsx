import { useState, useEffect } from 'react';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Páginas Gerais
import Login from './pages/Login/Login';
import HomeAdmin from './pages/Admin/HomeAdmin';
import Dashboard from './pages/Admin/Dashboard';
import UserControl from './pages/Admin/ListaUsuarios';
import CadastroUsuario from './pages/Admin/CadastroUsuario';
import HomeAluno from './pages/Aluno/HomeAluno';
import EditarAula from './pages/Admin/EditarAula'
import CriarAula from './pages/Admin/CriarAula'
import FazerAula from './pages/Aluno/FazerAula'

// Funções
import NaoEncontrado from './functions/NaoEncontrado';

/**
 * Componente principal da aplicação.
 * Gerencia as rotas e permissões de acesso dos usuários.
 */
function App() {
  const [permissao, setPermissao] = useState(null); // Estado para armazenar a permissão do usuário
  const [verificandoPermissao, setVerificandoPermissao] = useState(true); // Estado para verificar a permissão do usuário

  useEffect(() => {
    const verificarPermissao = async () => {
      // Atribuindo permissão "ADMIN" para teste
      const permissaoUsuario = 'ADMIN'; // Altere isso para testar com qualquer permissão
      console.log('Permissão do usuário:', permissaoUsuario);
      setPermissao(permissaoUsuario); // Armazena a permissão no estado
      setVerificandoPermissao(false); // Define que a verificação foi concluída
    };
    verificarPermissao();
  }, []);

  // Exibe um div vazio enquanto a permissão está sendo verificada
  if (verificandoPermissao) {
    return <div></div>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/homeAdmin" />} // Redireciona diretamente para o /home
        />
          <Route path="/login" element={<Login />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/homeAluno" element={<HomeAluno />} />
          <Route path="/usuarios" element={<UserControl />} />
          <Route path="/usuarios/criar" element={<CadastroUsuario />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/fazer/aula/:id" element={<FazerAula />} />
          <Route path="/aula/criar" element={<CriarAula />} />
          <Route path="/aula/:id" element={<EditarAula />} />


        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </>
  );
}

export default App;
