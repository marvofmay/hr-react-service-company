import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material'; // Importowanie ikon
// import axios from 'axios';
import Industry from '../../types/Industry';
import fakeIndustries from '../../fake_data/Industries';
import IndustryPreviewModal from './modal/preview';
import CreateIndustryModal from './modal/create';
import EditIndustryModal from './modal/edit';

type SortDirection = 'asc' | 'desc' | undefined;

const IndustriesTable = () => {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Ładowanie danych z backendu
    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                // const response = await axios.get('/api/industries', {
                //   params: {
                //     pageSize,
                //     pageIndex,
                //     sortBy,
                //     sortDirection,
                //   },
                // });
                // setIndustries(response.data); // Zakładając, że backend zwraca posortowane dane

                console.log('111', pageIndex, pageSize, sortBy, sortDirection);
                setIndustries(fakeIndustries);
            } catch (error) {
                console.error("Error fetching industries:", error);
            }
        };

        fetchIndustries();
    }, [pageIndex, pageSize, sortBy, sortDirection]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handlePreview = (industry: Industry) => {
        setSelectedIndustry(industry);
        setIsPreviewModalOpen(true);
    };

    const handleClosePreviewModal = () => {
        setIsPreviewModalOpen(false);
        setSelectedIndustry(null);
    };

    const handleEdit = (industry: Industry) => {
        setSelectedIndustry(industry);
        setIsEditModalOpen(true);
    };

    const handleUpdateIndustry = (updatedIndustry: Industry) => {
        setIndustries(prevIndustries => prevIndustries.map(industry => (industry.uuid === updatedIndustry.uuid ? updatedIndustry : industry)));
    };

    const handleDelete = (uuid: string) => {
        // ToDo: delete in backend 
        setIndustries(industries.filter(industry => industry.uuid !== uuid));
    };

    const handleCreateIndustry = (newIndustry: Industry) => {
        // ToDo: create in backend
        setIndustries((prevIndustries) => [...prevIndustries, newIndustry]);
    };

    const handleOpenCreateModal = () => setIsCreateModalOpen(true);
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);

    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => setIsEditModalOpen(false);

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Add />}
                    onClick={handleOpenCreateModal}
                >
                    Add Industry
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sortDirection={sortBy === 'id' ? sortDirection : false}
                                onClick={() => handleSort('id')}
                                style={{ padding: '2px 4px' }}
                            >
                                <TableSortLabel active={sortBy === 'id'} direction={sortBy === 'id' ? sortDirection : 'asc'}>
                                    #
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={sortBy === 'name' ? sortDirection : false}
                                onClick={() => handleSort('name')}
                                style={{ padding: '2px 4px' }}
                            >
                                <TableSortLabel active={sortBy === 'name'} direction={sortBy === 'name' ? sortDirection : 'asc'}>
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={sortBy === 'description' ? sortDirection : false}
                                onClick={() => handleSort('description')}
                                style={{ padding: '2px 4px' }}
                            >
                                <TableSortLabel active={sortBy === 'description'} direction={sortBy === 'description' ? sortDirection : 'asc'}>
                                    Description
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={{ padding: '2px 4px' }}>Created At</TableCell>
                            <TableCell style={{ padding: '2px 4px' }}>Updated At</TableCell>
                            <TableCell style={{ padding: '2px 4px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {industries.map((industry, index) => (
                            <TableRow key={industry.uuid}>
                                <TableCell style={{ padding: '2px 4px' }}>{index + 1}</TableCell>
                                <TableCell style={{ padding: '2px 4px' }}>{industry.name}</TableCell>
                                <TableCell style={{ padding: '2px 4px' }}>{industry.description}</TableCell>
                                <TableCell style={{ padding: '2px 4px' }}>{industry.created_at}</TableCell>
                                <TableCell style={{ padding: '2px 4px' }}>{industry.updated_at}</TableCell>
                                <TableCell style={{ padding: '2px 4px' }}>
                                    <IconButton
                                        color="default"
                                        onClick={() => handlePreview(industry)}
                                        style={{ marginRight: 8 }}
                                    >
                                        <Preview />
                                    </IconButton>
                                    <IconButton
                                        color="warning"
                                        onClick={() => handleEdit(industry)}
                                        style={{ marginRight: 8 }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(industry.uuid)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={industries.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />

            <IndustryPreviewModal open={isPreviewModalOpen} selectedIndustry={selectedIndustry} onClose={handleClosePreviewModal} />
            <CreateIndustryModal
                open={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onAddIndustry={handleCreateIndustry}
            />
            <EditIndustryModal
                open={isEditModalOpen}
                industry={selectedIndustry}
                onClose={handleCloseEditModal}
                onSave={handleUpdateIndustry}
            />
        </div>
    );
};

export default IndustriesTable;
