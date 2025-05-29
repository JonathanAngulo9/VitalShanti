import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';

export default function ListPaciente({ pacientes, onEdit, onView }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const visibleRows = pacientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="tabla de pacientes">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No hay pacientes para mostrar.
                                </TableCell>
                            </TableRow>
                        ) : (
                            visibleRows.map((p) => (
                                <TableRow key={p.id} hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{p.firstName}</TableCell>
                                    <TableCell>{p.lastName}</TableCell>
                                    <TableCell>{p.email}</TableCell>
                                    <TableCell>{p.phone}</TableCell>
                                    <TableCell sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => onView(p)}
                                            style={{ color: 'black', borderColor: '#A88BEB' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => onEdit(p)}
                                            style={{ backgroundColor: '#A88BEB', color: 'white' }}
                                        >
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pacientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Filas por página:"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
