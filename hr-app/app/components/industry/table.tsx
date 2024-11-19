import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import Industry from '../../types/Industry';
import CreateIndustryModal from './modal/create';
import EditIndustryModal from './modal/edit';
import PreviewIndustryModal from './modal/preview';
import DeleteIndustryModal from './modal/delete';
import useIndustriesQuery from '../../hooks/industry/useIndustriesQuery';
import useAddIndustryMutation from '@/app/hooks/industry/useAddIndustryMutation';
import useUpdateIndustryMutation from '@/app/hooks/industry/useUpdateIndustryMutation';
import useDeleteIndustryMutation from '@/app/hooks/industry/useDeleteIndustryMutation';
import { toast } from 'react-toastify';

type SortDirection = 'asc' | 'desc' | undefined;

const IndustriesTable = () => {
    const [localIndustries, setLocalIndustries] = useState<Industry[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);

    const { data, isLoading, error } = useIndustriesQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: addIndustryMutate, isSuccess: isAddSuccess, error: isAddError } = useAddIndustryMutation();
    const { mutate: updateIndustryMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdateIndustryMutation();
    const { mutate: deleteIndustryMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeleteIndustryMutation();

    useEffect(() => {
        if (data) {
            setLocalIndustries(data);
        }
    }, [data]);

    useEffect(() => {
        if (isAddSuccess) {
            closeModal();
            toast.success('Nowy przemysł została dodany.');
        }
        if (isAddError) {
            closeModal();
            toast.success('Błąd podczas dodawania przemysłu.');
        }
    }, [isAddSuccess, isAddError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            closeModal();
            toast.success('Przemysł został zaktualizowany.');
        }
        if (isUpdateError) {
            toast.error('Błąd podczas aktualizacji przemysłu.');
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success('Przemysł został usunięty.');
        }
        if (isDeleteError) {
            closeModal();
            toast.success('Błąd podczas usuwania przemysłu.');
        }
    }, [isDeleteSuccess, isDeleteError]);

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
        addIndustryMutate(industry);
    };

    const handleDelete = (industryToDelete: Industry) => {
        deleteIndustryMutate(industryToDelete, {
            onSuccess: (currentIndustries) => {
                setLocalIndustries(currentIndustries);
            }
        });
    };

    const handleUpdate = (updatedIndustry: Industry) => {
        updateIndustryMutate(updatedIndustry, {
            onSuccess: (currentIndustries) => {
                setLocalIndustries(currentIndustries);
            }
        });
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
                    <div>something went wrong :(</div>
                </Box>
            ) : localIndustries && localIndustries.length === 0 ? (
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
                            {localIndustries?.map((industry, index) => (
                                <TableRow key={industry.uuid}>
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

            {localIndustries && localIndustries.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={localIndustries.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />}

            {modalType === 'preview' && <PreviewIndustryModal
                open={true}
                selectedIndustry={selectedIndustry}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreateIndustryModal
                open={true}
                onClose={closeModal}
                onAddIndustry={industry => { handleAdd(industry); }}
            />}

            {modalType === 'edit' && <EditIndustryModal
                open={true}
                industry={selectedIndustry}
                onClose={closeModal}
                onSave={handleUpdate}
            />}

            {modalType === 'delete' && <DeleteIndustryModal
                open={true}
                selectedIndustry={selectedIndustry}
                onClose={closeModal}
                onDeleteConfirm={(industry) => { handleDelete(industry); }}
            />}
        </div>
    );
};

export default IndustriesTable;
