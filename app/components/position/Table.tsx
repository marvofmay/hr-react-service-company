import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import Position from '../../types/Position';
import CreatePositionModal from './modal/Create';
import EditPositionModal from './modal/Edit';
import PreviewPositionModal from './modal/Preview';
import DeletePositionModal from './modal/Delete';
import usePositionsQuery from '../../hooks/position/usePositionsQuery';
import useAddPositionMutation from '@/app/hooks/position/useAddPositionMutation';
import useUpdatePositionMutation from '@/app/hooks/position/useUpdatePositionMutation';
import useDeletePositionMutation from '@/app/hooks/position/useDeletePositionMutation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

const PositionsTable = () => {
    const [localPositions, setLocalPositions] = useState<Position[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

    const { data, isLoading, error } = usePositionsQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: addPositionMutate, isSuccess: isAddSuccess, error: isAddError } = useAddPositionMutation();
    const { mutate: updatePositionMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdatePositionMutation();
    const { mutate: deletePositionMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeletePositionMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            setLocalPositions(data);
        }
    }, [data]);

    useEffect(() => {
        if (isAddSuccess) {
            closeModal();
            toast.success('Nowe stanowisko zostało dodane.');
        }
        if (isAddError) {
            closeModal();
            toast.success('Błąd podczas dodawania stanowiska.');
        }
    }, [isAddSuccess, isAddError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            closeModal();
            toast.success('Stanowisko zostało zaktualizowane.');
        }
        if (isUpdateError) {
            toast.error('Błąd podczas aktualizacji stanowiska.');
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success('Stanowisko zostało usunięte.');
        }
        if (isDeleteError) {
            closeModal();
            toast.success('Błąd podczas usuwania stanowiska.');
        }
    }, [isDeleteSuccess, isDeleteError]);

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
        addPositionMutate(position);
    };

    const handleDelete = (positionToDelete: Position) => {
        deletePositionMutate(positionToDelete, {
            onSuccess: (currentPositions) => {
                setLocalPositions(currentPositions);
            }
        });
    };

    const handleUpdate = (updatedPosition: Position) => {
        updatePositionMutate(updatedPosition, {
            onSuccess: (currentPositions) => {
                setLocalPositions(currentPositions);
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    {t('position.button.add')}
                </Button>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.message.somethingWentWrong')} :(</div>
                </Box>
            ) : localPositions && localPositions.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.noData')}</div>
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
                                        {t('position.table.column.name')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('position.table.column.description')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('position.table.column.createdAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('position.table.column.updatedAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}> {t('position.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localPositions?.map((position, index) => (
                                <TableRow key={position.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.description}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.createdAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{position.updatedAt}</TableCell>
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

            {localPositions && localPositions.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={localPositions.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />}

            {modalType === 'preview' && <PreviewPositionModal
                open={true}
                selectedPosition={selectedPosition}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreatePositionModal
                open={true}
                onClose={closeModal}
                onAddPosition={position => { handleAdd(position); }}
            />}

            {modalType === 'edit' && <EditPositionModal
                open={true}
                position={selectedPosition}
                onClose={closeModal}
                onSave={handleUpdate}
            />}

            {modalType === 'delete' && <DeletePositionModal
                open={true}
                selectedPosition={selectedPosition}
                onClose={closeModal}
                onDeleteConfirm={(position) => { handleDelete(position); }}
            />}
        </div>
    );
};

export default PositionsTable;

