import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, MenuItem, Select, InputLabel, FormControl, Button, Typography, Icon } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import './static/CasosTable.css';

const columns = [
    { id: 'titulo', label: 'EXERCÍCIO', minWidth: 100, Icon: ContactsIcon },
    { id: 'prazo', label: 'PRAZO', minWidth: 100, Icon: GroupsIcon },
    { id: 'actions', label: 'EDITAR', minWidth: 170, Icon: ArticleIcon }
];

function AulasTable() {
    const [aulas, setAulas] = useState([]);
    const [filteredAulas, setFilteredAulas] = useState(aulas);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/homeAluno`)
        .then((response) => {
          if (!response.ok) throw new Error("Erro ao buscar aula");
          return response.json();
        })
        .then((data) => {
          if (data && data.aula)
            setAulas(data.aula)
            setFilteredAulas(data.aula)
        })
          .catch(error => console.error("Nao foi possivel carregar o bagulho: ", error))
    }, [searchTerm, sortOption, aulas]);

    return (
        <div style={{backgroundColor: "#FAF7F7",  minHeight: '100vh'}}>
        <div style={{ padding: '2%', maxWidth: '90%', margin: 'auto' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold',textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px', color: '#B9171C' }} component='h1'>
                Controle de Aulas
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <TextField
                    label="Buscar pelo Nome"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '40%', backgroundColor: '#fff', borderRadius: '5px' }}
                />
                <FormControl variant="outlined" size="small" style={{ width: '20%', backgroundColor: '#fff', borderRadius: '5px' }}>
                    <InputLabel>Ordenar Por</InputLabel>
                    <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
                                            {column.Icon && <Icon component={column.Icon} style={{ marginRight: 5, color: '#DCDCDC' }} />}
                                            {column.label}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAulas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((aula) => (
                                <TableRow hover key={aula.id} style={{ transition: 'background-color 0.3s' }}>
                                    {columns.map((column) => (
                                        <TableCell 
                                        key={column.id} 
                                        align="center" 
                                        style={{ 
                                            padding: '15px',
                                            fontFamily: 'Tahoma, sans-serif',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#000',
                                        }}
                                        >
                                            {column.id === 'actions' ? (
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#B9171C", color: "#fff", borderRadius: '5px', padding: '8px 20px', transition: 'background-color 0.3s' }}
                                                    onClick={() => navigate(`/aula/editar/${aula.id}`)}
                                                >
                                                    Editar
                                                </Button>
                                            ) : (
                                                aula[column.id]
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
                    count={filteredAulas.length}
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
                <Link to='/aula/criar' style={{ textDecoration: 'none' }}>
                    <Button variant="contained" style={{ backgroundColor: '#B9171C', color: 'white', borderRadius: '5px', padding: '10px 30px', transition: 'background-color 0.3s' }}>
                        Criar Nova Aula
                    </Button>
                </Link>
            </div>
        </div>
    </div>
    );
}

export default AulasTable;
