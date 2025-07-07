import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, MenuItem, IconButton, FormControlLabel, Box, Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Company from '../../../types/Company';
import fakeCompanies from '../../../fakeData/Companies';
import fakeIdustries from "@/app/fakeData/Industries";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from '@mui/icons-material/Edit';
import CreateDepartmentModal from "@/app/components/department/modal/Create";
import Department from '@/app/types/Department';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';

interface EditCompanyModalProps {
    open: boolean;
    onClose: () => void;
    company: Company | null;
    onSave: (updatedCompany: Company) => void;
}

type TreeItemWithLabel = {
    id: string;
    label: string;
    secondaryLabel?: string;
    department: Department;
};

interface CustomLabelProps {
    children: string;
    className: string;
    secondaryLabel: string;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ open, onClose, company, onSave }) => {
    const { t } = useTranslation();

    const MAX_PHONE_FIELDS = 3;
    const [phones, setPhones] = useState([""]);

    const MAX_EMAIL_FIELDS = 3;
    const [emails, setEmails] = useState([""]);

    const MAX_WEB_FIELDS = 3;
    const [webs, setWebs] = useState([""]);

    const [departments, setDepartments] = useState<Department[]>([]);
    const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

    const [treeDepartments, setTreeDepartments] = useState<TreeViewBaseItem<TreeItemWithLabel>[]>([]);

    function CustomLabel({ children, className, secondaryLabel }: CustomLabelProps) {
        return (
            <div className={className}>
                <Typography>{children}</Typography>
                {secondaryLabel && (
                    <Typography variant="caption" color="secondary">
                        {secondaryLabel}
                    </Typography>
                )}
            </div>
        );
    }

    const CustomTreeItem = React.forwardRef(function CustomTreeItem(
        props: TreeItem2Props,
        ref: React.Ref<HTMLLIElement>,
    ) {
        const { publicAPI } = useTreeItem2Utils({
            itemId: props.itemId,
            children: props.children,
        });

        const item = publicAPI.getItem(props.itemId);

        return (
            <TreeItem2
                {...props}
                ref={ref}
                label={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CustomLabel className="tree-label" secondaryLabel={item?.secondaryLabel || ''}>
                            {item?.label || ''}
                        </CustomLabel>
                        <div>
                            <IconButton onClick={e => {
                                e.stopPropagation();
                                handleEditDepartment(item.department);
                            }} size="small" color="info">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={e => {
                                e.stopPropagation();
                                handleRemoveDepartment(item.department);
                            }} size="small" color="error">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </div>
                    </div>
                }
            >
                {item?.children && item.children.map((child: TreeItemWithLabel) => (
                    <CustomTreeItem
                        key={child.id}
                        itemId={child.id}
                        label={child.label}
                    />
                ))}
            </TreeItem2 >
        );
    });

    const transformDepartmentsToTree = (departments: Department[]): TreeViewBaseItem<TreeItemWithLabel>[] => {
        const departmentMap: Record<string, TreeViewBaseItem<TreeItemWithLabel>> = {};
        const rootDepartments: TreeViewBaseItem<TreeItemWithLabel>[] = [];

        // Tworzenie mapy departmentMap
        departments.forEach(department => {
            if (department.uuid === '') {
                department.uuid = `new-department-${crypto.randomUUID()}`;
            }
            departmentMap[department.uuid] = {
                id: department.uuid,
                label: department.name || '',
                secondaryLabel: department.description || '',
                department: department,
                children: [],
            };
        });

        // Przekształcenie danych w strukturę drzewa
        departments.forEach(department => {
            const parentId = department.departmentSuperior?.uuid || null;
            if (parentId && parentId !== '' && departmentMap[parentId]) {
                // Dodajemy element jako dziecko do rodzica
                departmentMap[parentId].children?.push(departmentMap[department.uuid]);
            } else {
                // Dodajemy element do korzenia, jeśli nie ma rodzica
                rootDepartments.push(departmentMap[department.uuid]);
            }
        });

        return rootDepartments;
    };

    useEffect(() => {
        if (company) {
            setDepartments(company.departments || []);
        }
    }, [company]);

    useEffect(() => {
        if (departments.length > 0) {
            const treeData = transformDepartmentsToTree(departments);
            setTreeDepartments(treeData);
        }
    }, [departments]);

    const handleAddPhone = (values: Company, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        if (values.phone.length < MAX_PHONE_FIELDS) {
            const newPhones = [...values.phone, ""];
            setPhones(newPhones);
            setFieldValue("phone", newPhones);
        }
    };

    const handleRemovePhone = (index: number, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        const updatedPhones = [...phones];
        updatedPhones.splice(index, 1);
        setPhones(updatedPhones);
        setFieldValue("phone", updatedPhones);
    };

    const handleAddEmail = (values: Company, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        if (values.email.length < MAX_EMAIL_FIELDS) {
            const newEmails = [...values.email, ""];
            setEmails(newEmails);
            setFieldValue("email", newEmails);
        }
    };

    const handleRemoveEmail = (index: number, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        const updatedEmails = [...emails];
        updatedEmails.splice(index, 1);
        setEmails(updatedEmails);
        setFieldValue("email", updatedEmails);
    };

    const handleAddWeb = (values: Company, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        if (values.web.length < MAX_WEB_FIELDS) {
            const newWebs = [...values.web, ""];
            setWebs(newWebs);
            setFieldValue("web", newWebs);
        }
    };

    const handleRemoveWeb = (index: number, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        const updatedWebs = [...webs];
        updatedWebs.splice(index, 1);
        setWebs(updatedWebs);
        setFieldValue("web", updatedWebs);
    };

    const handleAddOrUpdateDepartment = (department: Department) => {
        if (editingDepartment) {
            setDepartments((prev) =>
                prev.map((dept) =>
                    dept.uuid === editingDepartment.uuid ? { ...dept, ...department } : dept
                )
            );
        } else {
            setDepartments((prev) => [...prev, department]);
        }
        setEditingDepartment(null);
        setDepartmentModalOpen(false);
    };

    const handleEditDepartment = (department: Department) => {
        setEditingDepartment(department);
        setDepartmentModalOpen(true);
    };

    const handleRemoveDepartment = (department: Department) => {
        setDepartments(prevDepartments =>
            prevDepartments.filter(dep => dep.uuid !== department.uuid)
        );
    };

    const initialValues: Company = {
        uuid: company?.uuid || '',
        fullName: company?.fullName || '',
        shortName: company?.shortName || '',
        nip: company?.nip || '',
        regon: company?.regon || '',
        description: company?.description || '',
        industry: {
            uuid: company?.industry?.uuid || '',
            name: company?.industry?.name || '',
        },
        companySuperior: {
            uuid: company?.companySuperior?.uuid || '',
            name: company?.companySuperior?.name || '',
        },
        address: {
            country: company?.address?.country || '',
            city: company?.address?.city || '',
            postcode: company?.address?.postcode || '',
            street: company?.address?.street || '',
        },
        phone: company?.phone || [""],
        email: company?.email || [""],
        web: company?.web || [""],
        departments: company?.departments || [],
        active: company?.active || true,
        createdAt: company?.createdAt || '',
        updatedAt: company?.updatedAt || '',
        deletedAt: company?.deletedAt || '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required(t('validation.fieldIsRequired')),
    });

    const handleSubmit = (values: Company) => {
        if (company) {
            const updatedCompany = {
                ...company,
                ...values,
                departments: departments || [],
            }
            onSave(updatedCompany);
            onClose();
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
                <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {t('company.modal.edit.title')}
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, handleChange }) => (
                        <Form noValidate>
                            <DialogContent>
                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(4, 1fr)"
                                    gap={2}
                                >
                                    {/* Kolumna 1 */}
                                    <Box sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        transition: 'border-color 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#34495e',
                                        },
                                    }}
                                    >
                                        <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.mainData')}</Typography>
                                        <Field
                                            as={TextField}
                                            name="fullName"
                                            label={t('company.form.field.fullName')}
                                            value={values.fullName}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={touched.fullName && Boolean(errors.fullName)}
                                            helperText={touched.fullName && errors.fullName}
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            name="shortName"
                                            label={t('company.form.field.shortName')}
                                            value={values.shortName}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={touched.shortName && Boolean(errors.shortName)}
                                            helperText={touched.shortName && errors.shortName}
                                        />
                                        <Field
                                            as={TextField}
                                            name="nip"
                                            label={t('company.form.field.nip')}
                                            value={values.nip}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={touched.nip && Boolean(errors.nip)}
                                            helperText={touched.nip && errors.nip}
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            name="regon"
                                            label={t('company.form.field.regon')}
                                            value={values.regon}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={touched.regon && Boolean(errors.regon)}
                                            helperText={touched.regon && errors.regon}
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="industry.uuid"
                                            value={values.industry?.uuid}
                                            onChange={handleChange}
                                            label={t('company.form.field.industry')}
                                            variant="outlined"
                                            margin="normal"
                                            error={touched?.industry?.uuid && Boolean(errors?.industry?.uuid)}
                                            helperText={touched?.industry?.uuid && errors?.industry?.uuid}
                                            required
                                        >
                                            {fakeIdustries.map(industry => <MenuItem key={industry.uuid} value={industry.uuid}>{industry.name}</MenuItem>)}
                                        </Field>
                                        <Field
                                            as={TextField}
                                            name="description"
                                            label={t('company.form.field.description')}
                                            value={values.description}
                                            onChange={handleChange}
                                            multiline
                                            rows={5}
                                            fullWidth
                                            margin="normal"
                                            error={touched.description && Boolean(errors.description)}
                                            helperText={touched.description && errors.description}
                                        />
                                        <Field
                                            as={TextField}
                                            select
                                            value={values.companySuperior.uuid}
                                            onChange={handleChange}
                                            fullWidth
                                            name="companySuperior.uuid"
                                            label={t('company.form.field.companySuperior')}
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {fakeCompanies.map(company => <MenuItem key={company.uuid} value={company.uuid}>{company.fullName}</MenuItem>)}
                                        </Field>
                                    </Box>

                                    {/* Kolumna 2 */}
                                    <Box sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        transition: 'border-color 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#34495e',
                                        },
                                    }}>
                                        <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.addressData')}</Typography>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="address.country"
                                            label={t('department.form.field.country')}
                                            value={values.address?.country}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={touched?.address?.country && Boolean(errors?.address?.country)}
                                            helperText={touched?.address?.country && errors?.address?.country}
                                            required
                                        >
                                            <MenuItem value="Polska">Polska</MenuItem>
                                            <MenuItem value="Anglia">Anglia</MenuItem>
                                            <MenuItem value="Nimecy">Niemcy</MenuItem>
                                        </Field>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="address.city"
                                            label={t('department.form.field.city')}
                                            value={values.address?.city}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={touched?.address?.city && Boolean(errors?.address?.city)}
                                            helperText={touched?.address?.city && errors?.address?.city}
                                            required
                                        >
                                            <MenuItem value="Gdańsk">Gdańsk</MenuItem>
                                            <MenuItem value="Sopot">Sopot</MenuItem>
                                            <MenuItem value="Gdynia">Gdynia</MenuItem>
                                        </Field>
                                        <Field
                                            as={TextField}
                                            name="address.postcode"
                                            label={t('department.form.field.postcode')}
                                            value={values.address?.postcode}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={touched?.address?.postcode && Boolean(errors?.address?.postcode)}
                                            helperText={touched?.address?.postcode && errors?.address?.postcode}
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            name="address.street"
                                            label={t('company.form.field.street')}
                                            value={values.address?.street}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={touched?.address?.street && Boolean(errors?.address?.street)}
                                            helperText={touched?.address?.street && errors?.address?.street}
                                            required
                                        />
                                    </Box>

                                    {/* Kolumna 3 */}
                                    <Box sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        transition: 'border-color 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#34495e',
                                        },
                                    }}>
                                        <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.additionalData')}</Typography>
                                        <Box>
                                            {values.phone.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={2}
                                                >
                                                    <Field
                                                        as={TextField}
                                                        name={`phone[${index}]`}
                                                        type="tel"
                                                        label={`${t('company.form.field.phone')} ${index + 1}`}
                                                        fullWidth
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const target = e.target;
                                                            const updatedPhones = [...phones];
                                                            updatedPhones[index] = target.value;
                                                            setPhones(updatedPhones);
                                                            setFieldValue("phone", updatedPhones);
                                                        }}
                                                        error={touched.phone && index === 0 && Boolean(errors.phone?.[index])}
                                                        helperText={touched.phone && index === 0 && errors.phone?.[index]}
                                                        required={index === 0}
                                                    />
                                                    {index > 0 && (
                                                        <IconButton
                                                            onClick={() => handleRemovePhone(index, setFieldValue)}
                                                            color="error"
                                                            sx={{ ml: 1 }}
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            ))}

                                            {phones.length < MAX_PHONE_FIELDS && (
                                                <Box display="flex" alignItems="center">
                                                    <IconButton onClick={() => handleAddPhone(values, setFieldValue)} color="primary">
                                                        <AddCircleOutlineIcon />
                                                    </IconButton>
                                                    <Typography variant="body2" ml={1}>
                                                        {t('common.addAnotherPhoneNumber')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box>
                                            {values.email.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={2}
                                                >
                                                    <Field
                                                        as={TextField}
                                                        name={`email[${index}]`}
                                                        type="tel"
                                                        label={`${t('company.form.field.email')} ${index + 1}`}
                                                        fullWidth
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const target = e.target;
                                                            const updatedEmails = [...emails];
                                                            updatedEmails[index] = target.value;
                                                            setEmails(updatedEmails);
                                                            setFieldValue("email", updatedEmails);
                                                        }}
                                                        error={touched.email && index === 0 && Boolean(errors.email?.[index])}
                                                        helperText={touched.email && index === 0 && errors.email?.[index]}
                                                        required={index === 0}
                                                    />
                                                    {index > 0 && (
                                                        <IconButton
                                                            onClick={() => handleRemoveEmail(index, setFieldValue)}
                                                            color="error"
                                                            sx={{ ml: 1 }}
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    )}
                                                </Box>

                                            ))}

                                            {emails.length < MAX_EMAIL_FIELDS && (
                                                <Box display="flex" alignItems="center">
                                                    <IconButton onClick={() => handleAddEmail(values, setFieldValue)} color="primary">
                                                        <AddCircleOutlineIcon />
                                                    </IconButton>
                                                    <Typography variant="body2" ml={1}>
                                                        {t('common.addAnotherEmail')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box>
                                            {values.web.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={2}
                                                >
                                                    <Field
                                                        as={TextField}
                                                        name={`web[${index}]`}
                                                        type="tel"
                                                        label={`${t('company.form.field.web')} ${index + 1}`}
                                                        fullWidth
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const target = e.target;
                                                            const updatedWebs = [...webs];
                                                            updatedWebs[index] = target.value;
                                                            setWebs(updatedWebs);
                                                            setFieldValue("web", updatedWebs);
                                                        }}
                                                        error={touched.web && index === 0 && Boolean(errors.web?.[index])}
                                                        helperText={touched.web && index === 0 && errors.web?.[index]}
                                                        required={index === 0}
                                                    />
                                                    {index > 0 && (
                                                        <IconButton
                                                            onClick={() => handleRemoveWeb(index, setFieldValue)}
                                                            color="error"
                                                            sx={{ ml: 1 }}
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    )}
                                                </Box>

                                            ))}

                                            {webs.length < MAX_WEB_FIELDS && (
                                                <Box display="flex" alignItems="center">
                                                    <IconButton onClick={() => handleAddWeb(values, setFieldValue)} color="primary">
                                                        <AddCircleOutlineIcon />
                                                    </IconButton>
                                                    <Typography variant="body2" ml={1}>
                                                        {t('common.addAnotherWeb')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                    {/* Kolumna 4 */}
                                    <Box sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        transition: 'border-color 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#34495e',
                                        },
                                    }}>
                                        <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.departmentsData')}</Typography>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() => setDepartmentModalOpen(true)}
                                            sx={{ marginTop: "20px", fontSize: "12px" }}
                                        >
                                            {t('department.button.add')}
                                        </Button>
                                        <RichTreeView
                                            defaultExpandedItems={['pickers']}
                                            items={treeDepartments}
                                            slots={{ item: CustomTreeItem }}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    display="grid"
                                    gridTemplateColumns="1fr"
                                    gap={2}
                                    sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        transition: 'border-color 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#34495e',
                                        },
                                        marginTop: '5px',
                                    }}
                                >
                                    <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.systemData')}</Typography>
                                    <Box
                                        display="grid"
                                        gridTemplateColumns="repeat(4, 1fr)"
                                        gap={2}
                                    >
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Field
                                                        as={Checkbox}
                                                        name="active"
                                                        color="primary"
                                                    />
                                                }
                                                label={t('company.form.field.active')}
                                                checked={values.active}
                                            />
                                        </Box>
                                        <Box>
                                            <Field
                                                as={TextField}
                                                type="datetime-local"
                                                name="createdAt"
                                                label={t('company.form.field.createdAt')}
                                                value={values.createdAt}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Box>
                                        <Box>
                                            <Field
                                                as={TextField}
                                                type="datetime-local"
                                                name="updatedAt"
                                                label={t('company.form.field.updatedAt')}
                                                value={values.updatedAt}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Box>
                                        <Box>
                                            <Field
                                                as={TextField}
                                                type="datetime-local"
                                                name="deletedAt"
                                                label={t('company.form.field.deletedAt')}
                                                value={values.deletedAt}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }}>
                                    {t('common.button.cancel')}
                                </Button>
                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#34495e', color: 'white', fontWeight: 'bold' }}>
                                    {t('common.button.save')}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog >
            <CreateDepartmentModal
                open={isDepartmentModalOpen}
                onClose={() => { setDepartmentModalOpen(false); setEditingDepartment(null); }}
                onAddDepartment={department => { handleAddOrUpdateDepartment(department); }}
                initialData={editingDepartment}
                departments={departments}
            />
        </>
    );
};

export default EditCompanyModal;