import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import Position from '../../types/Position';
import fakePositions from '../../fake_data/Positions';
import PreviewPositionModal from './modal/preview';
import CreatePositionModal from './modal/create';
import EditPositionModal from './modal/edit';
import DeletePositionModal from './modal/delete';


type SortDirection = 'asc' | 'desc' | undefined;

const PositionsTable = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPositions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Faktyczne wywołanie API tutaj
                // const response = await axios.get('/api/positions', { params: { pageSize, pageIndex, sortBy, sortDirection } });
                // setPositions(response.data);
                setPositions(fakePositions);
            } catch (error) {
                setError("Error fetching positions");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPositions();
    }, [pageIndex, pageSize, sortBy, sortDirection]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, position: Position | null = null) => {
        setModalType(type);
        setSelectedPosition(position);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedPosition(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleAdd = (position: Position) => {
        // ToDo: obsłuż dodawanie na backendzie
        position.uuid = `${positions.length + 1}`;
        setPositions([...positions, position])
    }

    const handleDelete = (positionToDelete: Position) => {
        // ToDo: obsłuż usuwanie na backendzie
        setPositions(positions.filter(position => position.uuid !== positionToDelete.uuid));
    };

    const handleUpdatePosition = (updatedPosition: Position) => {
        // ToDo: obsłuż aktualizację na backendzie
        setPositions(prevPositions => prevPositions.map(position => (position.uuid === updatedPosition.uuid ? updatedPosition : position)));
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    Add Position
                </Button>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{error}</div>
                </Box>
            ) : positions.length === 0 && !isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>No data</div>
                </Box>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sortDirection={sortBy === 'id' ? sortDirection : false}
                                    onClick={() => handleSort('id')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'id'} direction={sortBy === 'id' ? sortDirection : 'asc'}>
                                        #
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'name' ? sortDirection : false}
                                    onClick={() => handleSort('name')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'name'} direction={sortBy === 'name' ? sortDirection : 'asc'}>
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>Description</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>Created At</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>Updated At</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {positions.map((position, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.description}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.created_at}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.updated_at}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', position)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('edit', position)}><Edit /></IconButton>
                                        <IconButton onClick={() => openModal('delete', position)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {positions.length > 0 && <TablePagination rowsPerPageOptions={[5, 10, 25, 50, 100]} component="div" count={positions.length} rowsPerPage={pageSize} page={pageIndex} onPageChange={(event, newPage) => setPageIndex(newPage)} onRowsPerPageChange={handlePageSizeChange} />}

            {modalType === 'preview' && <PreviewPositionModal
                open={true}
                selectedPosition={selectedPosition}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreatePositionModal
                open={true}
                onClose={closeModal}
                onAddPosition={position => { handleAdd(position); closeModal(); }}
            />}

            {modalType === 'edit' && <EditPositionModal
                open={true}
                position={selectedPosition}
                onClose={closeModal}
                onSave={handleUpdatePosition}
            />}

            {modalType === 'delete' && <DeletePositionModal
                open={true}
                selectedPosition={selectedPosition}
                onClose={closeModal}
                onDeleteConfirm={(position) => { handleDelete(position); closeModal(); }}
            />}
        </div>
    );
};

export default PositionsTable;
