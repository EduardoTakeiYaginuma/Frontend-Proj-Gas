import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupsIcon from '@mui/icons-material/Groups';
import WarningIcon from '@mui/icons-material/Warning';
import ArticleIcon from '@mui/icons-material/Article';
import Typography from '@mui/material/Typography';
import './static/ListaAulas.css';

const columns = [
    { id: 'aluno', label: 'EXERCÍCIO', minWidth: 100, Icon: ContactsIcon },
    { id: 'prazo', label: 'PRAZO', minWidth: 100, Icon: GroupsIcon },
    { id: 'score', label: 'SCORE', minWidth: 100, Icon: WarningIcon }, 
    { id: 'actions', label: 'ACESSAR', minWidth: 170, Icon: ArticleIcon }
];

const urgencyOrder = { 'BAIXA': 1, 'MEDIA': 2, 'ALTA': 3, 'NAO INFORMADO': 0 };

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
        // Aqui você pode fazer o fetch para pegar os dados da API se necessário.
    }, []);

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleViewClick = (id) => {
        navigate(`/fazer/aula/${id}`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Usando um valor fixo de score
    const fixedScore = 75; // Exemplo de valor fixo

    // Função para determinar a cor do score
    const getScoreColor = (score) => {
        if (score >= 70) {
            return 'green';
        } else if (score >= 50) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    return (
        <div>
            <div className='title' style={{ display: "flex", justifyContent: "space-between" , paddingTop:"2%"}}>
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
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className="table-header">
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth, backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
                                        className="header-cell"
                                    >
                                        <div className="icon-label" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <div className='icon' style={{ paddingRight: "3px" }}>
                                                {column.Icon && <Icon component={column.Icon} sx={{ fontSize: 18 }} />}
                                            </div>
                                            <div>{column.label}</div>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredCasos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((caso) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={caso._id}>
                                    {columns.map((column) => {
                                        let value;
                                        if (column.id === 'score') {
                                            const score = caso.score; // Usando o valor do score do caso
                                            const scoreColor = getScoreColor(score); // Obtém a cor
                                            value = (
                                                <div 
                                                    style={{
                                                        backgroundColor: scoreColor, 
                                                        color: 'white',
                                                        padding: '5px 10px', 
                                                        borderRadius: '10px', 
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {score}%
                                                </div>
                                            );
                                        } else if (column.id === 'actions') {
                                            value = (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleViewClick(caso._id)}
                                                    style={{backgroundColor:"#B9171C"}}
                                                >
                                                    Acessar
                                                </Button>
                                            );
                                        } else {
                                            value = column.id === 'aluno' ? caso.aluno.nome : caso[column.id];
                                        }

                                        return (
                                            <TableCell key={column.id} align="center">
                                                {value}
                                            </TableCell>
                                        );
                                    })}
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
                />
            </Paper>
        </div>
    );
}

export default CasosTable;
