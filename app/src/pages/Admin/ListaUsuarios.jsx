import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import HeaderAdmin from './HeaderAdmin';
import './static/CasosTable.css';
import { Link } from 'react-router-dom';


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
    <div>
      <HeaderAdmin />
      <div className='title' style={{ display: "flex", justifyContent: "space-between", paddingTop:"2%" }}>
      <Typography 
        variant="h4" 
        component="h4" 
        style={{ 
          paddingLeft:"5%",
          paddingBottom:"1vh",
          fontFamily: 'Roboto, sans-serif', 
          fontWeight: 'bold', 
          textTransform: 'uppercase',
        }}
      >
        Controle de Usuários
      </Typography>
      <div className="filter-container" style={{paddingRight: "4%"}}>
        <div className="filter-box">
          <TextField
            label="Busque Pelo Nome"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            className="compact-input"
          />
          <FormControl variant="outlined" size="small" className="compact-input">
            <InputLabel>Ordenar Por</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Ordenar Por"
            >
              <MenuItem value=""><em>Nada</em></MenuItem>
              <MenuItem value="nameAsc">Nome (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Nome (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
      <Paper className="table-container">
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth, backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
                  >
                    <div className="icon-label" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {column.Icon && <column.Icon sx={{ fontSize: 18, marginRight: 1 }} />}
                      {column.label}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.id === 'delete' ? (
                        <Button 
                          variant="contained" 
                          color="error" 
                          startIcon={<DeleteIcon />} 
                          onClick={() => handleDelete(row.id)}
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
          onRowsPerPageChange={event => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Paper>

      <div className='button-container' style={{  display: 'flex', justifyContent: 'center',alignItems: 'center', paddingTop:"3vh"}}>
        <Link to='/usuarios/criar' className='create-user'>
          <Button variant="contained" disableElevation style={{ backgroundColor: '#B9171C'}}>Criar novo aluno</Button>
        </Link>
      </div>
      
    </div>
  );
}

export default UserControl;
