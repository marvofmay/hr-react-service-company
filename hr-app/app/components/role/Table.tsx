import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    IconButton,
    Button,
    Box,
    CircularProgress,
    TextField
} from '@mui/material';
import { Preview, Edit, Delete, Add, Key, Search } from '@mui/icons-material';
import Role from '../../types/Role';
import CreateRoleModal from './modal/Create';
import EditRoleModal from './modal/Edit';
import PreviewRoleModal from './modal/Preview';
import DeleteRoleModal from './modal/Delete';
import EditPermissionRoleModal from '@/app/components/permission/modal/EditPermissionRole';
import useRolesQuery from '../../hooks/role/useRolesQuery';
import useAddRoleMutation from '@/app/hooks/role/useAddRoleMutation';
import useUpdateRoleMutation from '@/app/hooks/role/useUpdateRoleMutation';
import useDeleteRoleMutation from '@/app/hooks/role/useDeleteRoleMutation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import modules from '@/app/fakeData/Modules';
import permissions from '@/app/fakeData/Permissions';
import moment from 'moment';
import { useUser } from "@/app/context/UserContext";

type SortDirection = 'asc' | 'desc' | undefined;

const RolesTable = () => {
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const [phrase, setPhrase] = useState<string>('');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [localRoles, setLocalRoles] = useState<Role[]>([]);
    const { data, isLoading, error } = useRolesQuery(pageSize, pageIndex, sortBy, sortDirection, phrase);
    const { mutate: addRoleMutate } = useAddRoleMutation();
    const { mutate: updateRoleMutate, isSuccess: isUpdateSuccess, error: isUpdateError } = useUpdateRoleMutation();
    const { mutate: deleteRoleMutate } = useDeleteRoleMutation();
    const { t } = useTranslation();
    const { hasPermission } = useUser();

    useEffect(() => {
        if (data?.roles) {
            setLocalRoles(data.roles);
        }
    }, [data]);

    const handleSearch = () => {
        setPhrase(searchPhrase);
    };

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

    const handleAdd = async (newRole: Role): Promise<void> => {
        return new Promise((resolve, reject) => {
            addRoleMutate(newRole, {
                onSuccess: (message: string) => {
                    toast.success(message);
                    resolve();
                },
                onError: (error: any) => {
                    console.log('error handleAdd', error);
                    reject(error);
                },
            });
        });
    };

    const handleDelete = (roleToDelete: Role): Promise<void> => {
        return new Promise((resolve, reject) => {
            deleteRoleMutate(roleToDelete, {
                onSuccess: (message: string) => {
                    toast.success(message);
                    resolve();
                },
                onError: (error: any) => {
                    console.log('error handleDelete', error);
                    reject(error);
                },
            });
        });
    };

    const handleUpdate = (updatedRole: Role): Promise<void> => {
        return new Promise((resolve, reject) => {
            updateRoleMutate(updatedRole, {
                onSuccess: (message: string) => {
                    toast.success(message);

                    resolve();
                },
                onError: (error: any) => {
                    console.log('error handleUpdate', error);
                    reject(error);
                },
            });
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                        variant="outlined"
                        placeholder={t('common.enterPhraseToSearch')}
                        size="small"
                        sx={{ width: '500px' }}
                        onChange={(e) => setSearchPhrase(e.target.value)}
                    />
                    <Button
                        startIcon={<Search />}
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        {t('common.button.search')}
                    </Button>
                </Box>
                {hasPermission("roles.create") &&
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Add />}
                        onClick={() => openModal('create')}
                    >
                        {t('role.button.add')}
                    </Button>
                }
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.message.somethingWentWrong')} :(</div>
                </Box>
            ) : data && data.roles.length === 0 ? (
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
                                        {t('role.table.column.name')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'description' ? sortDirection : false}
                                    onClick={() => handleSort('description')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'description'} direction={sortBy === 'description' ? sortDirection : 'asc'}>
                                        {t('role.table.column.description')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'createdAt' ? sortDirection : false}
                                    onClick={() => handleSort('createdAt')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'createdAt'} direction={sortBy === 'createdAt' ? sortDirection : 'asc'}>
                                        {t('role.table.column.createdAt')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('role.table.column.updatedAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('role.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localRoles?.map((role, index) => (
                                <TableRow key={role.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.description || '-'}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{moment(role.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{role.updatedAt ? moment(role.updatedAt).format('YYYY-MM-DD HH:mm:ss') : '-'}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        {hasPermission("roles.preview") && <IconButton onClick={() => openModal('preview', role)}><Preview /></IconButton>}
                                        {hasPermission("roles.edit") && <IconButton onClick={() => openModal('edit', role)}><Edit /></IconButton>}
                                        <IconButton onClick={() => openModal('permission', role)}><Key /></IconButton>
                                        {hasPermission("roles.delete") && <IconButton onClick={() => openModal('delete', role)}><Delete /></IconButton>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {data && data.roles.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={data.totalRoles}
                    rowsPerPage={pageSize}
                    page={pageIndex - 1}
                    onPageChange={(_, newPage) => setPageIndex(newPage + 1)}
                    onRowsPerPageChange={handlePageSizeChange}
                    labelRowsPerPage={t('common.rowPerPage')}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('common.of')} ${count}`}
                />
            )}

            {hasPermission("roles.preview") && modalType === 'preview' && <PreviewRoleModal open={true} selectedRole={selectedRole} onClose={closeModal} />}
            {hasPermission("roles.create") && modalType === 'create' && <CreateRoleModal open={true} onClose={closeModal} onAddRole={role => handleAdd(role)} />}
            {hasPermission("roles.edit") && modalType === 'edit' && <EditRoleModal open={true} role={selectedRole} onClose={closeModal} onSave={handleUpdate} />}
            {hasPermission("roles.delete") && modalType === 'delete' && <DeleteRoleModal open={true} selectedRole={selectedRole} onClose={closeModal} onDeleteConfirm={role => handleDelete(role)} />}
            {modalType === 'permission' && <EditPermissionRoleModal
                open={true}
                selectedRole={selectedRole}
                onClose={closeModal}
                onSave={handleUpdate}
                modules={modules}
                permissions={permissions}
            />}
        </div>
    );
};

export default RolesTable;
