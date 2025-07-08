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
    TextField,
    Checkbox
} from '@mui/material';
import { Preview, Edit, Delete, Add, Key, Search } from '@mui/icons-material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Role from '@/app/types/Role';
import CreateRoleModal from '@/app/components/role/modal/Create';
import EditRoleModal from '@/app/components/role/modal/Edit';
import PreviewRoleModal from '@/app/components/role/modal/Preview';
import ImportRolesFromXLSXModal from '@/app/components/role/modal/importRolesFromXLSX';
import DeleteRoleModal from '@/app/components/role/modal/Delete';
import DeleteMultipleRolesModal from '@/app/components/role/modal/DeleteMultiple';
import EditPermissionRoleModal from '@/app/components/permission/modal/EditPermissionRole';
import useRolesQuery from '@/app/hooks/role/useRolesQuery';
import useAddRoleMutation from '@/app/hooks/role/useAddRoleMutation';
import useUpdateRoleMutation from '@/app/hooks/role/useUpdateRoleMutation';
import useDeleteRoleMutation from '@/app/hooks/role/useDeleteRoleMutation';
import useDeleteMultipleRoleMutation from '@/app/hooks/role/useDeleteMultipleRoleMutation'
import useImportRolesFromXLSXMutation from '@/app/hooks/role/importRolesFromXLSXMutation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import modules from '@/app/fakeData/Modules';
import permissions from '@/app/fakeData/Permissions';
import moment from 'moment';
import { useUser } from "@/app/context/UserContext";

type SortDirection = 'asc' | 'desc';

const RolesTable = () => {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const [phrase, setPhrase] = useState<string>('');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [localRoles, setLocalRoles] = useState<Role[]>([]);
    const result = useRolesQuery(pageSize, pageIndex, sortBy, sortDirection, phrase);
    const data = result.data as { items: Role[]; total: number } | undefined;
    const { isLoading, error } = result;
    const { mutate: addRoleMutate } = useAddRoleMutation();
    const { mutate: updateRoleMutate } = useUpdateRoleMutation();
    const { mutate: deleteRoleMutate } = useDeleteRoleMutation(pageSize, pageIndex, sortBy, sortDirection, phrase, setPageIndex);
    const { mutate: deleteMultipleRoleMutate } = useDeleteMultipleRoleMutation(pageSize, pageIndex, sortBy, sortDirection, phrase, setPageIndex);
    const { mutate: importRolesFromXLSXMutate } = useImportRolesFromXLSXMutation();
    const { t } = useTranslation();
    const { hasPermission } = useUser();
    const [selected, setSelected] = useState<string[]>([]);
    const allSelected = selected.length === data?.items?.length && data?.items?.length > 0;

    useEffect(() => {
        if (data?.items) {
            setLocalRoles(data.items);
        }
    }, [data]);

    const handleSearch = () => {
        setPhrase(searchPhrase);
        setPageIndex(1);
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
        setPageIndex(1)
        setPageSize(Number(event.target.value));
    };

    const handleAdd = async (newRole: Role): Promise<void> => {
        return new Promise((resolve, reject) => {
            addRoleMutate(newRole, {
                onSuccess: (message: string) => {
                    setPageIndex(1);
                    toast.success(message);
                    resolve();
                },
                onError: (error: object) => {
                    toast.error(t('role.add.error'));
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
                onError: (error: object) => {
                    toast.error(t('role.delete.error'));

                    reject(error);
                },
            });
        });
    };

    const handleUpdate = async (updatedRole: Role): Promise<void> => {
        return new Promise((resolve, reject) => {
            updateRoleMutate(updatedRole, {
                onSuccess: (message: string) => {
                    toast.success(message);

                    resolve();
                },
                onError: (error: object) => {
                    toast.error(t('role.update.error'));

                    reject(error);
                },
            });
        });
    };

    const handleImportRolesFromXLSX = async (file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            importRolesFromXLSXMutate(file, {
                onSuccess: (message: string) => {
                    toast.success(message);

                    resolve();
                },
                onError: (error: object) => {
                    toast.error(t('common.message.somethingWentWrong'));

                    console.log(error);

                    reject(error);
                },
            });
        });
    };

    const toggleSelectAll = () => {
        setSelected(allSelected ? [] : localRoles.map((role: Role) => role.uuid));
    };

    const toggleSelectRow = (uuid: string) => {
        setSelected((prev) =>
            prev.includes(uuid) ? prev.filter((item) => item !== uuid) : [...prev, uuid]
        );
    };

    const handleDeleteMultiple = (rolesToDelete: Role[]): Promise<void> => {
        return new Promise((resolve, reject) => {
            deleteMultipleRoleMutate(rolesToDelete, {
                onSuccess: (message: string) => {
                    toast.success(message);
                    resolve();
                },
                onError: (error: object) => {
                    toast.error(t('role.delete.error'));

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
                        onChange={(e) => {
                            setSearchPhrase(e.target.value);
                        }}
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

                <Box display="flex" alignItems="center" gap={1} ml="auto">
                    {hasPermission("roles.create") && (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<Add />}
                            onClick={() => openModal('create')}
                        >
                            {t('role.button.add')}
                        </Button>
                    )}
                    {hasPermission("roles.create") && (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<FileUploadOutlinedIcon />}
                            onClick={() => openModal('importFromXLSX')}
                        >
                            {t('role.button.importFromXLSX')}
                        </Button>
                    )}
                    {hasPermission("roles.delete") && selected.length > 0 && (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => openModal('multipleDelete')}
                        >
                            {t('role.button.deleteChecked')}
                        </Button>
                    )}
                </Box>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.message.somethingWentWrong')} :(</div>
                </Box>
            ) : data && data.items?.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.noData')}</div>
                </Box>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {hasPermission("roles.delete") && (
                                    <TableCell sx={{ width: "50px", minWidth: "50px", maxWidth: "50px", padding: "4px 8px" }}
                                        onChange={toggleSelectAll}
                                    >
                                        <Checkbox
                                            checked={allSelected}
                                            onChange={toggleSelectAll}
                                        />
                                    </TableCell>)}
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
                                    sx={{ width: "750px", minWidth: "750px", maxWidth: "750px", padding: "4px 8px" }}
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
                                <TableCell
                                    sortDirection={sortBy === 'updatedAt' ? sortDirection : false}
                                    onClick={() => handleSort('updatedAt')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'updateddAt'} direction={sortBy === 'updatedAt' ? sortDirection : 'asc'}>
                                        {t('role.table.column.updatedAt')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('role.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localRoles?.map((role, index) => (
                                <TableRow key={role.uuid}>
                                    {hasPermission("roles.delete") && (<TableCell sx={{ width: "50px", minWidth: "50px", maxWidth: "50px", padding: "4px 8px" }}>
                                        <Checkbox
                                            checked={selected.includes(role.uuid)}
                                            onChange={() => toggleSelectRow(role.uuid)}
                                        />
                                    </TableCell>)}
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

            {data && data.items.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={data.total}
                    rowsPerPage={pageSize}
                    page={pageIndex - 1}
                    onPageChange={(_, newPage) => setPageIndex(newPage + 1)}
                    onRowsPerPageChange={handlePageSizeChange}
                    labelRowsPerPage={t('common.rowPerPage')}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('common.of')} ${count}`}
                />
            )}

            {hasPermission("roles.preview") && modalType === 'preview' && <PreviewRoleModal
                open={true}
                selectedRole={selectedRole}
                onClose={closeModal}
            />}
            {hasPermission("roles.create") && modalType === 'create' && <CreateRoleModal
                open={true}
                onClose={closeModal}
                onAddRole={role => handleAdd(role)}
            />}
            {hasPermission("roles.edit") && modalType === 'edit' && <EditRoleModal
                open={true}
                role={selectedRole}
                onClose={closeModal}
                onSave={handleUpdate} />}
            {modalType === 'permission' && <EditPermissionRoleModal
                open={true}
                selectedRole={selectedRole}
                onClose={closeModal}
                onSave={handleUpdate}
                modules={modules}
                permissions={permissions}
            />}
            {hasPermission("roles.create") && modalType === 'importFromXLSX' && <ImportRolesFromXLSXModal
                open={true}
                onClose={closeModal}
                onImportRolesFromXLSX={handleImportRolesFromXLSX}
                allowedTypes={["xlsx"]}
            />}
            {hasPermission("roles.delete") && modalType === 'delete' && <DeleteRoleModal
                open={true}
                selectedRole={selectedRole}
                onClose={closeModal}
                onDeleteConfirm={role => handleDelete(role)} />}
            {hasPermission("roles.delete") && modalType === 'multipleDelete' && <DeleteMultipleRolesModal
                open={true}
                selectedRoles={localRoles.filter(role => selected.includes(role.uuid))}
                onClose={closeModal}
                onDeleteMultipleConfirm={roles => handleDeleteMultiple(roles)}
            />}
        </div>
    );
};

export default RolesTable;
