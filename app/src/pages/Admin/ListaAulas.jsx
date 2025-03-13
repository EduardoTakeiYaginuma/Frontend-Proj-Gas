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
import './static/CasosTable.css';
import { Link } from 'react-router-dom';

const columns = [
    { id: 'aluno', label: 'EXERCÍCIO', minWidth: 100, Icon: ContactsIcon },
    { id: 'prazo', label: 'PRAZO', minWidth: 100, Icon: GroupsIcon },
    { id: 'actions', label: 'EDITAR', minWidth: 170, Icon: ArticleIcon }
];

const urgencyOrder = { 'BAIXA': 1, 'MEDIA': 2, 'ALTA': 3, 'NAO INFORMADO': 0 };

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
        // Aqui você pode fazer o fetch para pegar os dados da API se necessário.
        // Estou usando dados mockados para demonstrar.
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
        navigate(`/aula/${id}`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <div className='title' style={{ display: "flex", justifyContent: "space-between" , paddingTop:"2%"}}>
                <Typography 
                    variant="h4" 
                    component="h4" 
                    style={{ 
                        
                        textAlign: 'center', 
                        fontFamily: 'Roboto, sans-serif', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        paddingLeft: "5%"
                    }}
                >
                    Controle de Aulas
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
                                .map((caso, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={caso._id}>
                                        {columns.map((column) => {
                                            let value;
                                            if (column.id === 'actions') {
                                                value = (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleViewClick(caso._id)}
                                                        style={{backgroundColor:"#B9171C"}}
                                                    >
                                                        Editar
                                                    </Button>
                                                );
                                            } else {
                                                // Aqui, você precisa acessar o nome de aluno, que é `caso.aluno.nome`
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

            <div className='button-container' style={{  display: 'flex', justifyContent: 'center',alignItems: 'center', paddingTop:"3vh"}}>
            <Link to='/aula/criar' className='create-user'>
                <Button variant="contained" disableElevation style={{ backgroundColor: '#B9171C'}}>Criar nova aula</Button>
            </Link>
            </div>
        </div>
    );
}

export default CasosTable;
