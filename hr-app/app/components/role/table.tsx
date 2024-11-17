import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import Role from '../../types/Role';
import CreateRoleModal from './modal/create';
import EditRoleModal from './modal/edit';
import PreviewRoleModal from './modal/preview';
import DeleteRoleModal from './modal/delete';
import useRolesQuery from '../../hooks/role/useRolesQuery';
import useAddRoleMutation from '@/app/hooks/role/useAddRoleMutation';
import useUpdateRoleMutation from '@/app/hooks/role/useUpdateRoleMutation';
import useDeleteRoleMutation from '@/app/hooks/role/useDeleteRoleMutation';
import { toast } from 'react-toastify';

type SortDirection = 'asc' | 'desc' | undefined;

const RolesTable = () => {
    const [localRoles, setLocalRoles] = useState<Role[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const { data, isLoading, error } = useRolesQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: addRoleMutate, isSuccess: isAddSuccess, error: isAddError } = useAddRoleMutation();
    const { mutate: updateRoleMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdateRoleMutation();
    const { mutate: deleteRoleMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeleteRoleMutation();

    useEffect(() => {
        if (data) {
            setLocalRoles(data);
        }
    }, [data]);

    useEffect(() => {
        if (isAddSuccess) {
            closeModal();
            toast.success('Nowa rola została dodana.');
        }
        if (isAddError) {
            closeModal();
            toast.success('Błąd podczas dodawania roli.');
        }
    }, [isAddSuccess, isAddError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            closeModal();
            toast.success('Rola została zaktualizowana.');
        }
        if (isUpdateError) {
            toast.error('Błąd podczas aktualizacji roli.');
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success('Rola została usunięta.');
        }
        if (isDeleteError) {
            closeModal();
            toast.success('Błąd podczas usuwania roli.');
        }
    }, [isDeleteSuccess, isDeleteError]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, role: Role | null = null) => {
        setModalType(type);
        setSelectedRole(role);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedRole(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleAdd = (role: Role) => {
        addRoleMutate(role);
    };

    const handleDelete = (roleToDelete: Role) => {
        deleteRoleMutate(roleToDelete, {
            onSuccess: (currentRoles) => {
                setLocalRoles(currentRoles);
            }
        });
    };

    const handleUpdate = (updatedRole: Role) => {
        updateRoleMutate(updatedRole, {
            onSuccess: (currentRoles) => {
                setLocalRoles(currentRoles);
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => openModal('create')}>
                    Add Role
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
            ) : localRoles && localRoles.length === 0 ? (
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
                            {localRoles?.map((role, index) => (
                                <TableRow key={role.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.description}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.created_at}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.updated_at}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', role)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('edit', role)}><Edit /></IconButton>
                                        <IconButton onClick={() => openModal('delete', role)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {localRoles && localRoles.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={localRoles.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => setPageIndex(newPage)}
                onRowsPerPageChange={handlePageSizeChange}
            />}

            {modalType === 'preview' && <PreviewRoleModal
                open={true}
                selectedRole={selectedRole}
                onClose={closeModal}
            />}

            {modalType === 'create' && <CreateRoleModal
                open={true}
                onClose={closeModal}
                onAddRole={role => { handleAdd(role); }}
            />}

            {modalType === 'edit' && <EditRoleModal
                open={true}
                role={selectedRole}
                onClose={closeModal}
                onSave={handleUpdate}
            />}

            {modalType === 'delete' && <DeleteRoleModal
                open={true}
                selectedRole={selectedRole}
                onClose={closeModal}
                onDeleteConfirm={(role) => { handleDelete(role); }}
            />}
        </div>
    );
};

export default RolesTable;
