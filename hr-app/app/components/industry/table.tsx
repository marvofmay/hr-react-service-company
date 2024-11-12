import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import Industry from '../../types/Industry';
import fakeIndustries from '../../fake_data/Industries';
import IndustryPreviewModal from './modal/preview';
import CreateIndustryModal from './modal/create';
import EditIndustryModal from './modal/edit';
import DeleteIndustryModal from './modal/delete';


type SortDirection = 'asc' | 'desc' | undefined;

const IndustriesTable = () => {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIndustries = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Faktyczne wywołanie API tutaj
                // const response = await axios.get('/api/industries', { params: { pageSize, pageIndex, sortBy, sortDirection } });
                // setIndustries(response.data);
                setIndustries(fakeIndustries);
            } catch (error) {
                setError("Error fetching industries");
            } finally {
                setIsLoading(false);
            }
        };

        fetchIndustries();
    }, [pageIndex, pageSize, sortBy, sortDirection]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, industry: Industry | null = null) => {
        setModalType(type);
        setSelectedIndustry(industry);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedIndustry(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleAdd = (industry: Industry) => {
        // ToDo: obsłuż dodawanie na backendzie
        industry.uuid = `${industries.length + 1}`;
        setIndustries([...industries, industry])
        console.log(industries);
    }

    const handleDelete = (industryToDelete: Industry) => {
        // ToDo: obsłuż usuwanie na backendzie
        setIndustries(industries.filter(industry => industry.uuid !== industryToDelete.uuid));
    };

    const handleUpdateIndustry = (updatedIndustry: Industry) => {
        // ToDo: obsłuż aktualizację na backendzie
        setIndustries(prevIndustries => prevIndustries.map(industry => (industry.uuid === updatedIndustry.uuid ? updatedIndustry : industry)));
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    Add Industry
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
            ) : industries.length === 0 && !isLoading ? ( // Dodajemy sprawdzenie, czy nie trwa ładowanie
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
                                    sx={{ padding: '4px 8px' }} // Zmniejszenie paddingu
                                >
                                    <TableSortLabel active={sortBy === 'id'} direction={sortBy === 'id' ? sortDirection : 'asc'}>
                                        #
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'name' ? sortDirection : false}
                                    onClick={() => handleSort('name')}
                                    sx={{ padding: '4px 8px' }} // Zmniejszenie paddingu
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
                            {industries.map((industry, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{industry.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{industry.description}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{industry.created_at}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{industry.updated_at}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', industry)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('edit', industry)}><Edit /></IconButton>
                                        <IconButton onClick={() => openModal('delete', industry)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {industries.length > 0 && <TablePagination rowsPerPageOptions={[5, 10, 25, 50, 100]} component="div" count={industries.length} rowsPerPage={pageSize} page={pageIndex} onPageChange={(event, newPage) => setPageIndex(newPage)} onRowsPerPageChange={handlePageSizeChange} />}

            {modalType === 'preview' && <IndustryPreviewModal
                open={true}
                selectedIndustry={selectedIndustry}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreateIndustryModal
                open={true}
                onClose={closeModal}
                onAddIndustry={industry => { handleAdd(industry); closeModal(); }}
            />}

            {modalType === 'edit' && <EditIndustryModal
                open={true}
                industry={selectedIndustry}
                onClose={closeModal}
                onSave={handleUpdateIndustry}
            />}

            {modalType === 'delete' && <DeleteIndustryModal
                open={true}
                selectedIndustry={selectedIndustry}
                onClose={closeModal}
                onDeleteConfirm={(industry) => { handleDelete(industry); closeModal(); }}
            />}
        </div>
    );
};

export default IndustriesTable;
