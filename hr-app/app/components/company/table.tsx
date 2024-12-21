import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Company from '../../types/Company';
import CreateCompanyModal from './modal/create';
import EditCompanyModal from './modal/edit';
import PreviewCompanyModal from './modal/preview';
import DeleteCompanyModal from './modal/delete';
import useCompaniesQuery from '../../hooks/company/useCompaniesQuery';
import useAddCompanyMutation from '@/app/hooks/company/useAddCompanyMutation';
import useUpdateCompanyMutation from '@/app/hooks/company/useUpdateCompanyMutation';
import useDeleteCompanyMutation from '@/app/hooks/company/useDeleteCompnayMutation';
import { toast } from 'react-toastify'; 0
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

const CompaniesTable = () => {
    const [localCompanies, setLocalCompanies] = useState<Company[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const { data, isLoading, error } = useCompaniesQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: addCompanyMutate, isSuccess: isAddSuccess, error: isAddError } = useAddCompanyMutation();
    const { mutate: updateCompanyMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdateCompanyMutation();
    const { mutate: deleteCompanyMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeleteCompanyMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            setLocalCompanies(data);
        }
    }, [data]);

    useEffect(() => {
        if (isAddSuccess) {
            closeModal();
            toast.success(t('company.add.success'));
        }
        if (isAddError) {
            closeModal();
            toast.success('company.add.error');
        }
    }, [isAddSuccess, isAddError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            closeModal();
            toast.success(t('company.update.success'));
        }
        if (isUpdateError) {
            toast.error(t('company.update.error'));
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success(t('company.delete.sucess'));
        }
        if (isDeleteError) {
            closeModal();
            toast.success(t('company.delete.error'));
        }
    }, [isDeleteSuccess, isDeleteError]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, company: Company | null = null) => {
        setModalType(type);
        setSelectedCompany(company);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedCompany(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleAdd = (company: Company) => {
        addCompanyMutate(company);
    };

    const handleDelete = (companyToDelete: Company) => {
        deleteCompanyMutate(companyToDelete, {
            onSuccess: (currentCompanies: Company[]) => {
                setLocalCompanies(currentCompanies);
            }
        });
    };

    const handleUpdate = (updatedCompany: Company) => {
        updateCompanyMutate(updatedCompany, {
            onSuccess: (currentCompanies: Company[]) => {
                setLocalCompanies(currentCompanies);
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    {t('company.button.add')}
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
            ) : localCompanies && localCompanies.length === 0 ? (
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
                                    sx={{ padding: '2px 4px' }}
                                >
                                    <TableSortLabel active={sortBy === 'id'} direction={sortBy === 'id' ? sortDirection : 'asc'}>
                                        #
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'fullName' ? sortDirection : false}
                                    onClick={() => handleSort('fullName')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'fullName'} direction={sortBy === 'fullName' ? sortDirection : 'asc'}>
                                        {t('company.table.column.fullName')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('company.table.column.industry')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('company.table.column.departments')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('company.table.column.active')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('company.table.column.createdAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('company.table.column.updatedAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('company.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localCompanies?.map((company, index) => (
                                <TableRow key={company.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{company.fullName}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{company.industry?.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{company.departments?.length}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        {company.active ? (<CheckCircleIcon color="success" fontSize="small" />) : (<CancelIcon color="error" fontSize="small" />)}
                                    </TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{company.createdAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{company.updatedAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', company)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('edit', company)}><Edit /></IconButton>
                                        <IconButton onClick={() => openModal('delete', company)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {localCompanies && localCompanies.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={localCompanies.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />}

            {modalType === 'preview' && <PreviewCompanyModal
                open={true}
                selectedCompany={selectedCompany}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreateCompanyModal
                open={true}
                onClose={closeModal}
                onAddCompany={company => { handleAdd(company); }}
            />}

            {modalType === 'edit' && <EditCompanyModal
                open={true}
                company={selectedCompany}
                onClose={closeModal}
                onSave={handleUpdate}
            />}

            {modalType === 'delete' && <DeleteCompanyModal
                open={true}
                selectedCompany={selectedCompany}
                onClose={closeModal}
                onDeleteConfirm={(company) => { handleDelete(company); }}
            />}
        </div>
    );
};

export default CompaniesTable;
