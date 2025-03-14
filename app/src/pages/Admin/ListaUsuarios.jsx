import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, Button, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import HeaderAdmin from './HeaderAdmin';
import { Link } from 'react-router-dom';
import './static/CasosTable.css';

const columns = [
  { id: 'email', label: 'EMAIL', minWidth: 100, Icon: EmailIcon },
  { id: 'nome', label: 'NOME', minWidth: 100, Icon: BadgeIcon },
  { id: 'permissao', label: 'PERMISSÃO', minWidth: 100, Icon: SupervisorAccountIcon },
  { id: 'delete', label: 'DELETAR', minWidth: 100 }
];

function createData(id, email, nome, permissao) {
  return { id, email, nome, permissao };
}

const cookies = new Cookies();

function UserControl() {
  const [users, setUsers] = useState([
    createData(1, 'admin@example.com', 'Admin User', 'ADMIN'),
    createData(2, 'teacher@example.com', 'Teacher User', 'PROFESSOR'),
    createData(3, 'agent@example.com', 'Agent User', 'AGENTE')
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = id => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  React.useEffect(() => {
    const results = users.filter(user =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "nameAsc") {
      results.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (sortOption === "nameDesc") {
      results.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    setFilteredUsers(results);
  }, [searchTerm, sortOption, users]);

  return (
    <div style={{backgroundColor: "#FAF7F7", minHeight: '100vh'}}>
    <div>
      <HeaderAdmin />
      <div style={{ padding: '2%', maxWidth: '90%', margin: 'auto' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#B9171C' }}>
          Controle de Usuários
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <TextField
            label="Buscar pelo Nome"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '40%', backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <FormControl variant="outlined" size="small" style={{ width: '20%', backgroundColor: '#fff', borderRadius: '5px' }}>
            <InputLabel>Ordenar Por</InputLabel>
            <Select value={sortOption} onChange={handleSortChange}>
              <MenuItem value=""><em>Nada</em></MenuItem>
              <MenuItem value="nameAsc">Nome (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Nome (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Paper elevation={3} style={{ borderRadius: '10px', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#B9171C' }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center" style={{ fontWeight: 'bold', color: '#DCDCDC' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {column.Icon && <column.Icon style={{ marginRight: 5, color: '#DCDCDC' }} />}
                        {column.label}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover key={row.id} style={{ transition: 'background-color 0.3s' }}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="center" 
                      style={{ 
                        padding: '15px',
                        fontFamily: 'Tahoma, sans-serif', // Define a família da fonte
                        fontSize: '16px', // Define o tamanho da fonte
                        fontWeight: '500', // Define o peso da fonte
                        color: '#000', // Define a cor do texto
                    }}
                      >
                        {column.id === 'delete' ? (
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(row.id)}
                            style={{ borderRadius: '5px', padding: '8px 20px', transition: 'background-color 0.3s' }}
                          >
                            Deletar
                          </Button>
                        ) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </Paper>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Link to='/usuarios/criar' style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={{ backgroundColor: '#B9171C', color: 'white', borderRadius: '5px', padding: '10px 30px', transition: 'background-color 0.3s' }}>
              Criar Novo Usuário
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserControl;