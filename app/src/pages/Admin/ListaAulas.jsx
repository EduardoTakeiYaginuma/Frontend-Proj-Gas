import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, MenuItem, Select, InputLabel, FormControl, Button, Typography, Icon } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import './static/CasosTable.css';

const columns = [
    { id: 'aluno', label: 'EXERCÍCIO', minWidth: 100, Icon: ContactsIcon },
    { id: 'prazo', label: 'PRAZO', minWidth: 100, Icon: GroupsIcon },
    { id: 'actions', label: 'EDITAR', minWidth: 170, Icon: ArticleIcon }
];

function CasosTable() {
    const [casos, setCasos] = useState([
        { _id: '1', aluno: { nome: 'Exercício 1' }, prazo: '20/03/2025' },
        { _id: '2', aluno: { nome: 'Exercício 2' }, prazo: '25/03/2025' },
        { _id: '3', aluno: { nome: 'Exercício 3' }, prazo: '30/03/2025' },
    ]);
    const [filteredCasos, setFilteredCasos] = useState(casos);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const results = casos.filter(caso =>
            caso.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOption === "nameAsc") {
            results.sort((a, b) => a.aluno.nome.localeCompare(b.aluno.nome));
        } else if (sortOption === "nameDesc") {
            results.sort((a, b) => b.aluno.nome.localeCompare(a.aluno.nome));
        }

        setFilteredCasos(results);
    }, [searchTerm, sortOption, casos]);

    return (
        <div style={{backgroundColor: "#FAF7F7",  minHeight: '100vh'}}>
        <div style={{ padding: '2%', maxWidth: '90%', margin: 'auto',  }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#B9171C' }}>
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
                                            {column.id === 'actions' ? (
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#B9171C", color: "#fff", borderRadius: '5px', padding: '8px 20px', transition: 'background-color 0.3s' }}
                                                    onClick={() => navigate(`/aula/${caso._id}`)}
                                                >
                                                    Editar
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

export default CasosTable;