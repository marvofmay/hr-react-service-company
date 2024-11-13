import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Edit, Delete, Add } from '@mui/icons-material';
import Role from '../../types/Role';
import fakeRoles from '../../fake_data/Roles';
import CreateRoleModal from './modal/create';
import EditRoleModal from './modal/edit';
import PreviewRoleModal from './modal/preview';
import DeleteRoleModal from './modal/delete';

type SortDirection = 'asc' | 'desc' | undefined;

const RolesTable = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Faktyczne wywołanie API tutaj
                // const response = await axios.get('/api/roles', { params: { pageSize, pageIndex, sortBy, sortDirection } });
                // setRoles(response.data);
                setRoles(fakeRoles);
            } catch (error) {
                setError("Error fetching roles");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoles();
    }, [pageIndex, pageSize, sortBy, sortDirection]);

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
        // ToDo: obsłuż dodawanie na backendzie
        role.uuid = `${roles.length + 1}`;
        setRoles([...roles, role])
        console.log(roles);
    }

    const handleDelete = (roleToDelete: Role) => {
        // ToDo: obsłuż usuwanie na backendzie
        setRoles(roles.filter(role => role.uuid !== roleToDelete.uuid));
    };

    const handleUpdate = (updatedRole: Role) => {
        // ToDo: obsłuż aktualizację na backendzie
        setRoles(prevRoles => prevRoles.map(role => (role.uuid === updatedRole.uuid ? updatedRole : role)));
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
                    <div>{error}</div>
                </Box>
            ) : roles.length === 0 && !isLoading ? (
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
                            {roles.map((role, index) => (
                                <TableRow key={index}>
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

            {roles.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={roles.length}
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
                onAddRole={role => { handleAdd(role); closeModal(); }}
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
                onDeleteConfirm={(role) => { handleDelete(role); closeModal(); }}
            />}
        </div>
    );
};

export default RolesTable;
