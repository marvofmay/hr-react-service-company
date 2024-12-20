import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Employee from '../../types/Employee';
import CreateEmployeeModal from './modal/create';
import EditEmployeeModal from './modal/edit';
import PreviewEmployeeModal from './modal/preview';
import DeleteEmployeeModal from './modal/delete';
import useEmployeesQuery from '../../hooks/employee/useEmployeesQuery';
import useAddEmployeeMutation from '@/app/hooks/employee/useAddEmployeeMutation';
import useUpdateEmployeeMutation from '@/app/hooks/employee/useUpdateEmployeeMutation';
import useDeleteEmployeeMutation from '@/app/hooks/employee/useDeleteEmployeeMutation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

const EmployeesTable = () => {
    const [localEmployees, setLocalEmployees] = useState<Employee[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const { data, isLoading, error } = useEmployeesQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: addEmployeeMutate, isSuccess: isAddSuccess, error: isAddError } = useAddEmployeeMutation();
    const { mutate: updateEmployeeMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdateEmployeeMutation();
    const { mutate: deleteEmployeeMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeleteEmployeeMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            setLocalEmployees(data);
        }
    }, [data]);

    useEffect(() => {
        if (isAddSuccess) {
            closeModal();
            toast.success(t('employee.add.success'));
        }
        if (isAddError) {
            closeModal();
            toast.success('employee.add.error');
        }
    }, [isAddSuccess, isAddError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            closeModal();
            toast.success(t('employee.update.success'));
        }
        if (isUpdateError) {
            toast.error(t('employee.update.error'));
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success(t('employee.delete.sucess'));
        }
        if (isDeleteError) {
            closeModal();
            toast.success(t('employee.delete.error'));
        }
    }, [isDeleteSuccess, isDeleteError]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, employee: Employee | null = null) => {
        setModalType(type);
        setSelectedEmployee(employee);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedEmployee(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleAdd = (employee: Employee) => {
        console.log(employee);
        addEmployeeMutate(employee);
    };

    const handleDelete = (employeeToDelete: Employee) => {
        deleteEmployeeMutate(employeeToDelete, {
            onSuccess: (currentEmployees: Employee[]) => {
                setLocalEmployees(currentEmployees);
            }
        });
    };

    const handleUpdate = (updatedEmployee: Employee) => {
        updateEmployeeMutate(updatedEmployee, {
            onSuccess: (currentEmployees: Employee[]) => {
                setLocalEmployees(currentEmployees);
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    {t('employee.button.add')}
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
            ) : localEmployees && localEmployees.length === 0 ? (
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
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.externalUUID')}</TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'firstName' ? sortDirection : false}
                                    onClick={() => handleSort('firstName')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'firstName'} direction={sortBy === 'firstName' ? sortDirection : 'asc'}>
                                        {t('employee.table.column.firstName')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'lastName' ? sortDirection : false}
                                    onClick={() => handleSort('lastName')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'lastName'} direction={sortBy === 'lastName' ? sortDirection : 'asc'}>
                                        {t('employee.table.column.lastName')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.companyFullName')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.departmentFullName')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.employeeSuperior')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.position')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.contractType')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.active')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.role')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.createdAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.updatedAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('employee.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localEmployees?.map((employee, index) => (
                                <TableRow key={employee.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.externalUUID}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.firstName}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.lastName}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.company.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.department.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.employeeSuperior.uuid ? `${employee.employeeSuperior.lastName} ${employee.employeeSuperior.firstName} (${employee.employeeSuperior.uuid})` : '---'}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.position.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.contractType.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        {employee.active ? (<CheckCircleIcon color="success" fontSize="small" />) : (<CancelIcon color="error" fontSize="small" />)}
                                    </TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.role.name ?? '-'}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.createdAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{employee.updatedAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', employee)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('edit', employee)}><Edit /></IconButton>
                                        <IconButton onClick={() => openModal('delete', employee)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {localEmployees && localEmployees.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={localEmployees.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />}

            {modalType === 'preview' && <PreviewEmployeeModal
                open={true}
                selectedEmployee={selectedEmployee}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreateEmployeeModal
                open={true}
                onClose={closeModal}
                onAddEmployee={employee => { handleAdd(employee); }}
            />}

            {modalType === 'edit' && <EditEmployeeModal
                open={true}
                employee={selectedEmployee}
                onClose={closeModal}
                onSave={handleUpdate}
            />}

            {modalType === 'delete' && <DeleteEmployeeModal
                open={true}
                selectedEmployee={selectedEmployee}
                onClose={closeModal}
                onDeleteConfirm={(employee) => { handleDelete(employee); }}
            />}
        </div>
    );
};

export default EmployeesTable;
