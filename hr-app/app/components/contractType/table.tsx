import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import ContractType from '../../types/ContractType';
import CreateContractTypeModal from './modal/create';
import EditContractTypeModal from './modal/edit';
import PreviewContractTypeModal from './modal/preview';
import DeleteContractTypeModal from './modal/delete';
import useContractTypesQuery from '../../hooks/contractType/useContractTypesQuery';
import useAddContractTypeMutation from '@/app/hooks/contractType/useAddContractTypeMutation';
import useUpdateContractTypeMutation from '@/app/hooks/contractType/useUpdateContractTypeMutation';
import useDeleteContractTypeMutation from '@/app/hooks/contractType/useDeleteContractTypeMutation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

const ContractTypesTable = () => {
    const [localContractTypes, setLocalContractTypes] = useState<ContractType[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedContractType, setSelectedContractType] = useState<ContractType | null>(null);

    const { data, isLoading, error } = useContractTypesQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: addContractTypeMutate, isSuccess: isAddSuccess, error: isAddError } = useAddContractTypeMutation();
    const { mutate: updateContractTypeMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdateContractTypeMutation();
    const { mutate: deleteContractTypeMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeleteContractTypeMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            setLocalContractTypes(data);
        }
    }, [data]);

    useEffect(() => {
        if (isAddSuccess) {
            closeModal();
            toast.success(t('contractType.add.success'));
        }
        if (isAddError) {
            closeModal();
            toast.success(t('contractType.add.error'));
        }
    }, [isAddSuccess, isAddError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            closeModal();
            toast.success(t('contractType.update.success'));
        }
        if (isUpdateError) {
            toast.error(t('contractType.update.error'));
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success(t('contractType.delete.success'));
        }
        if (isDeleteError) {
            closeModal();
            toast.success(t('contractType.delete.error'));
        }
    }, [isDeleteSuccess, isDeleteError]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, ContractType: ContractType | null = null) => {
        setModalType(type);
        setSelectedContractType(ContractType);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedContractType(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleAdd = (ContractType: ContractType) => {
        addContractTypeMutate(ContractType);
    };

    const handleDelete = (ContractTypeToDelete: ContractType) => {
        deleteContractTypeMutate(ContractTypeToDelete, {
            onSuccess: (currentContractTypes: ContractType[]) => {
                setLocalContractTypes(currentContractTypes);
            }
        });
    };

    const handleUpdate = (updatedContractType: ContractType) => {
        updateContractTypeMutate(updatedContractType, {
            onSuccess: (currentContractTypes) => {
                setLocalContractTypes(currentContractTypes);
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    {t('contractType.button.add')}
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
            ) : localContractTypes && localContractTypes.length === 0 ? (
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
                                        {t('contractType.table.column.name')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('contractType.table.column.description')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('contractType.table.column.createdAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('contractType.table.column.updatedAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('contractType.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localContractTypes?.map((contractType, index) => (
                                <TableRow key={contractType.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{contractType.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{contractType.description}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{contractType.createdAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{contractType.updatedAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', contractType)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('edit', contractType)}><Edit /></IconButton>
                                        <IconButton onClick={() => openModal('delete', contractType)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {localContractTypes && localContractTypes.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={localContractTypes.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />}

            {modalType === 'preview' && <PreviewContractTypeModal
                open={true}
                selectedContractType={selectedContractType}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreateContractTypeModal
                open={true}
                onClose={closeModal}
                onAddContractType={ContractType => { handleAdd(ContractType); }}
            />}

            {modalType === 'edit' && <EditContractTypeModal
                open={true}
                ContractType={selectedContractType}
                onClose={closeModal}
                onSave={handleUpdate}
            />}

            {modalType === 'delete' && <DeleteContractTypeModal
                open={true}
                selectedContractType={selectedContractType}
                onClose={closeModal}
                onDeleteConfirm={(ContractType) => { handleDelete(ContractType); }}
            />}
        </div>
    );
};

export default ContractTypesTable;
