import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, TextField, MenuItem, Select, InputLabel, FormControl, Button, Icon, Typography 
} from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupsIcon from '@mui/icons-material/Groups';
import WarningIcon from '@mui/icons-material/Warning';
import ArticleIcon from '@mui/icons-material/Article';
import './static/ListaAulas.css';

const columns = [
  { id: 'aluno', label: 'EXERCÍCIO', minWidth: 100, Icon: ContactsIcon },
  { id: 'prazo', label: 'PRAZO', minWidth: 100, Icon: GroupsIcon },
  { id: 'score', label: 'SCORE', minWidth: 100, Icon: WarningIcon }, 
  { id: 'actions', label: 'ACESSAR', minWidth: 170, Icon: ArticleIcon }
];

function CasosTable() {
  const [casos, setCasos] = useState([
    { _id: '1', aluno: { nome: 'Exercício 1' }, prazo: '20/03/2025', score: 85 },
    { _id: '2', aluno: { nome: 'Exercício 2' }, prazo: '25/03/2025', score: 40 },
    { _id: '3', aluno: { nome: 'Exercício 3' }, prazo: '30/03/2025', score: 60 },
  ]);
  const [filteredCasos, setFilteredCasos] = useState(casos);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    let results = casos.filter(caso =>
      caso.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "nameAsc") {
      results.sort((a, b) => a.aluno.nome.localeCompare(b.aluno.nome));
    } else if (sortOption === "nameDesc") {
      results.sort((a, b) => b.aluno.nome.localeCompare(a.aluno.nome));
    }

    setFilteredCasos(results);
  }, [searchTerm, sortOption, casos]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSortChange = (event) => setSortOption(event.target.value);
  const handleViewClick = (id) => navigate(`/fazer_aula/${id}/exercicio/1`);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#4CAF50'; // Verde
    if (score >= 50) return '#FFC107'; // Amarelo
    return '#F44336'; // Vermelho
  };

  return (
    <div style={{ padding: '2%', maxWidth: '90%', margin: 'auto' }}>
      <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#B9171C' }}>
        Controle de Aulas
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
                  <TableCell key={column.id} align="center" 
                  style={{ fontWeight: 'bold', color: '#DCDCDC' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {column.Icon && <Icon component={column.Icon} style={{ marginRight: 5, color: '#DCDCDC' }} />}
                      {column.label}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCasos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((caso) => (
                <TableRow hover key={caso._id} style={{ transition: 'background-color 0.3s' }}>
                  {columns.map((column) => (
                    <TableCell 
                      key={column.id} 
                      align="center"
                      style={{ 
                        padding: '15px',
                        fontFamily: 'Tahoma, sans-serif', // Define a família da fonte
                        fontSize: '16px', // Define o tamanho da fonte
                        fontWeight: '500', // Define o peso da fonte
                        color: '#000', // Define a cor do texto
                      }}
                    >
                      {column.id === 'score' ? (
                        <div
                          style={{
                            backgroundColor: getScoreColor(caso.score),
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            fontWeight: '600',
                          }}
                        >
                          {caso.score}%
                        </div>
                      ) : column.id === 'actions' ? (
                        <Button
                          variant="contained"
                          style={{ 
                            backgroundColor: '#B9171C', 
                            color: '#fff',
                            fontWeight: '600',
                            textTransform: 'none',
                            borderRadius: '5px',
                            padding: '8px 20px',
                            transition: 'background-color 0.3s',
                          }}
                          onClick={() => handleViewClick(caso._id)}
                        >
                          Acessar
                        </Button>
                      ) : (
                        column.id === 'aluno' ? caso.aluno.nome : caso[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredCasos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ backgroundColor: '#f5f5f5' }}
        />
      </Paper>
    </div>
  );
}

export default CasosTable;