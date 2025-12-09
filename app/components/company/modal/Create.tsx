import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, MenuItem, FormControlLabel, Box, IconButton, Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import axios from "axios";
import * as Yup from 'yup';
import Company from '../../../types/Company';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import fakeIdustries from "@/app/fakeData/Industries";
import fakeCompanies from "@/app/fakeData/Companies";
import CreateDepartmentModal from "@/app/components/department/modal/Create";
// import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
// import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import { SERVICE_COMPANY_URL } from "@/app/utility/constans";

interface AddCompanyModalProps {
    open: boolean;
    onClose: () => void;
    onAddCompany: (newCompany: Company) => Promise<void>;
}

// type TreeItemWithLabel = {
//     id: string;
//     label: string;
//     secondaryLabel?: string;
//     department: Department;
// };

// interface CustomLabelProps {
//     children: string;
//     className: string;
//     secondaryLabel: string;
// }

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose, onAddCompany }) => {
    const { t } = useTranslation();

    const initialValues: Company = {
        uuid: '',
        companySuperior: {
            uuid: '',
            name: '',
        },
        fullName: '',
        shortName: '',
        internalCode: '',
        nip: '',
        regon: '',
        description: '',
        industry: {
            uuid: '',
            name: ''
        },
        active: true,
        address: {
            country: '',
            city: '',
            postcode: '',
            street: ''
        },
        phones: [""],
        emails: [""],
        webs: [""],
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: '',
        deletedAt: '',
    };

    const MAX_PHONE_FIELDS = 3;
    const [phones, setPhones] = useState([""]);

    const MAX_EMAIL_FIELDS = 3;
    const [emails, setEmails] = useState([""]);

    const MAX_WEB_FIELDS = 3;
    const [webs, setWebs] = useState([""]);

    const [industries, setIndustries] = useState<{ uuid: string; name: string }[]>([]);
    const [loadingIndustries, setLoadingIndustries] = useState(true);
    const [errorIndustries, setErrorIndustries] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        const fetchIndustries = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                setLoadingIndustries(true);
                const response = await axios.get(`${SERVICE_COMPANY_URL}/api/industries`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        sortBy: "name",
                        sortDirection: "ASC",
                        pageSize: 1000
                    }
                });

                setIndustries(response.data.data.items || []);
                setErrorIndustries(null);
            } catch (err: any) {
                setErrorIndustries("Nie udało się pobrać listy branż");
            } finally {
                setLoadingIndustries(false);
            }
        };

        fetchIndustries();
    }, [open]);

    // const [departments, setDepartments] = useState<Department[]>([]);
    // const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false);
    // const [editingDepartment, setEditingDepartment] = useState<Department | null | undefined>(null);

    // const [treeDepartments, setTreeDepartments] = useState<TreeViewBaseItem<TreeItemWithLabel>[]>([]);

    // function CustomLabel({ children, className, secondaryLabel }: CustomLabelProps) {
    //     return (
    //         <div className={className}>
    //             <Typography>{children}</Typography>
    //             {secondaryLabel && (
    //                 <Typography variant="caption" color="secondary">
    //                     {secondaryLabel}
    //                 </Typography>
    //             )}
    //         </div>
    //     );
    // }

    // const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    //     props: TreeItem2Props,
    //     ref: React.Ref<HTMLLIElement>,
    // ) {
    //     const { publicAPI } = useTreeItem2Utils({
    //         itemId: props.itemId,
    //         children: props.children,
    //     });

    //     const item = publicAPI.getItem(props.itemId);

    //     return (
    //         <TreeItem2
    //             {...props}
    //             ref={ref}
    //             label={
    //                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                     <CustomLabel className="tree-label" secondaryLabel={item?.secondaryLabel || ''}>
    //                         {item?.label || ''}
    //                     </CustomLabel>
    //                     <div>
    //                         <IconButton onClick={e => {
    //                             e.stopPropagation();
    //                             handleEditDepartment(item.department);
    //                         }} size="small" color="info">
    //                             <EditIcon /> --{item.department.uuid}--
    //                         </IconButton>
    //                         <IconButton onClick={e => {
    //                             e.stopPropagation();
    //                             handleRemoveDepartment(item.department);
    //                         }} size="small" color="error">
    //                             <RemoveCircleOutlineIcon />
    //                         </IconButton>
    //                     </div>
    //                 </div>
    //             }
    //         >
    //             {item?.children && item.children.map((child: TreeItemWithLabel) => (
    //                 <CustomTreeItem
    //                     key={child.id}
    //                     itemId={child.id}
    //                     label={child.label}
    //                 />
    //             ))}
    //         </TreeItem2 >
    //     );
    // });

    // const transformDepartmentsToTree = (departments: Department[]): TreeViewBaseItem<TreeItemWithLabel>[] => {
    //     const departmentMap: Record<string, TreeViewBaseItem<TreeItemWithLabel>> = {};
    //     const rootDepartments: TreeViewBaseItem<TreeItemWithLabel>[] = [];

    //     console.log('before transformDepartmentsToTree', departments);
    //     // Tworzenie mapy departmentMap
    //     departments.forEach(department => {
    //         // if (department.uuid === '') {
    //         //     department.uuid = `new-department-${crypto.randomUUID()}`;
    //         // }
    //         departmentMap[department.uuid] = {
    //             id: department.uuid,
    //             label: department.name || '',
    //             secondaryLabel: department.description || '',
    //             department: department,
    //             children: [],
    //         };
    //     });

    //     // Przekształcenie danych w strukturę drzewa
    //     departments.forEach(department => {
    //         const parentId = department.departmentSuperior?.uuid || null;
    //         if (parentId && parentId !== '' && departmentMap[parentId]) {
    //             // Dodajemy element jako dziecko do rodzica
    //             departmentMap[parentId].children?.push(departmentMap[department.uuid]);
    //         } else {
    //             // Dodajemy element do korzenia, jeśli nie ma rodzica
    //             rootDepartments.push(departmentMap[department.uuid]);
    //         }
    //     });

    //     return rootDepartments;
    // };

    // useEffect(() => {
    //     if (departments.length > 0) {
    //         const treeData = transformDepartmentsToTree(departments);
    //         setTreeDepartments(treeData);
    //     }
    // }, [departments]);

    const handleAddPhone = (values: Company, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        if (values.phones.length < MAX_PHONE_FIELDS) {
            const newPhones = [...values.phones, ""];
            setPhones(newPhones);
            setFieldValue("phones", newPhones);
        }
    };

    const handleRemovePhone = (index: number, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        const updatedPhones = [...phones];
        updatedPhones.splice(index, 1);
        setPhones(updatedPhones);
        setFieldValue("phones", updatedPhones);
    };

    const handleAddEmail = (values: Company, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        if (values.emails.length < MAX_EMAIL_FIELDS) {
            const newEmails = [...values.emails, ""];
            setEmails(newEmails);
            setFieldValue("emails", newEmails);
        }
    };

    const handleRemoveEmail = (index: number, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        const updatedEmails = [...emails];
        updatedEmails.splice(index, 1);
        setEmails(updatedEmails);
        setFieldValue("emails", updatedEmails);
    };

    const handleAddWeb = (values: Company, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        if (values.webs.length < MAX_WEB_FIELDS) {
            const newWebs = [...values.webs, ""];
            setWebs(newWebs);
            setFieldValue("webs", newWebs);
        }
    };

    const handleRemoveWeb = (index: number, setFieldValue: FormikHelpers<Company>["setFieldValue"]) => {
        const updatedWebs = [...webs];
        updatedWebs.splice(index, 1);
        setWebs(updatedWebs);
        setFieldValue("webs", updatedWebs);
    };

    // const handleAddOrUpdateDepartment = (department: Department) => {
    //     if (editingDepartment?.uuid !== undefined) {
    //         setDepartments(prev => prev.map(dept => dept.uuid === editingDepartment.uuid ? { ...dept, ...department } : dept));
    //     } else {
    //         department.uuid = `new-department-${crypto.randomUUID()}`;
    //         setDepartments(prev => [...prev, department]);
    //     }
    //     setEditingDepartment(null);
    //     setDepartmentModalOpen(false);
    //};

    // const handleEditDepartment = (department: Department) => {
    //     setEditingDepartment(department);
    //     setDepartmentModalOpen(true);
    // };

    // const handleRemoveDepartment = (department: Department) => {
    //     setDepartments(prevDepartments =>
    //         prevDepartments.filter(dep => dep.uuid !== department.uuid)
    //     );
    // };

    const validationSchema = Yup.object({
        fullName: Yup.string().required(t('validation.fieldIsRequired')),
        nip: Yup.string().required(t('validation.fieldIsRequired')),
        regon: Yup.string().required(t('validation.fieldIsRequired')),
        industry: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        address: Yup.object().shape({
            country: Yup.string().required(t('validation.fieldIsRequired')),
            city: Yup.string().required(t('validation.fieldIsRequired')),
            postcode: Yup.string().required(t('validation.fieldIsRequired')),
            street: Yup.string().required(t('validation.fieldIsRequired')),
        }),
    });

    const [errorAPI, setErrorAPI] = useState<string | null>(null);

    const handleSubmit = async (values: Company, helpers: FormikHelpers<Company>) => {
        const companyData = {
            ...values,
        };
        setErrorAPI(null);
        try {
            await onAddCompany(companyData);
            helpers.resetForm();
            onClose();
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as any).response?.data?.message
            ) {
                setErrorAPI((error as any).response.data.message);
            } else {
                setErrorAPI('Wystąpił nieznany błąd');
            }
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
                <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {t('company.modal.add.title')}
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form noValidate>
                            <DialogContent>
                                {errorAPI && (
                                    <div style={{ color: 'red', marginBottom: '1rem' }}>
                                        {errorAPI}
                                    </div>
                                )}
                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(3, 1fr)"
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
                                            fullWidth
                                            margin="normal"
                                            error={touched.shortName && Boolean(errors.shortName)}
                                            helperText={touched.shortName && errors.shortName}
                                        />
                                        <Field
                                            as={TextField}
                                            name="internalCode"
                                            label={t('company.form.field.internalCode')}
                                            value={values.internalCode}
                                            fullWidth
                                            margin="normal"
                                            error={touched.internalCode && Boolean(errors.internalCode)}
                                            helperText={touched.internalCode && errors.internalCode}
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            name="nip"
                                            label={t('company.form.field.nip')}
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
                                            label={t('company.form.field.industry')}
                                            margin="normal"
                                            error={touched?.industry?.uuid && Boolean(errors?.industry?.uuid)}
                                            helperText={touched?.industry?.uuid && errors?.industry?.uuid}
                                            required
                                        >
                                            {loadingIndustries && <MenuItem disabled>Ładowanie...</MenuItem>}

                                            {errorIndustries && <MenuItem disabled>{errorIndustries}</MenuItem>}

                                            {!loadingIndustries && industries.map(ind => (
                                                <MenuItem key={ind.uuid} value={ind.uuid}>
                                                    {ind.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        <Field
                                            as={TextField}
                                            name="description"
                                            label={t('company.form.field.description')}
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
                                            label={t('company.form.field.country')}
                                            variant="outlined"
                                            margin="normal"
                                            error={touched?.address?.country && Boolean(errors?.address?.country)}
                                            helperText={touched?.address?.country && errors?.address?.country}
                                            required
                                        >
                                            <MenuItem value="Polska">Polska</MenuItem>
                                            <MenuItem value="Anglia">Anglia</MenuItem>
                                            <MenuItem value="Niemcy">Niemcy</MenuItem>
                                        </Field>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="address.city"
                                            label={t('company.form.field.city')}
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
                                            label={t('company.form.field.postcode')}
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
                                        <Box sx={{ marginTop: "23px" }}>
                                            {values.phones.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={2}
                                                    sx={{ marginBottom: 1 }}
                                                >
                                                    <Field
                                                        as={TextField}
                                                        name={`phones[${index}]`}
                                                        type="tel"
                                                        label={`${t('company.form.field.phone')} ${index + 1}`}
                                                        fullWidth
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const target = e.target;
                                                            const updatedPhones = [...phones];
                                                            updatedPhones[index] = target.value;
                                                            setPhones(updatedPhones);
                                                            setFieldValue("phones", updatedPhones);
                                                        }}
                                                        error={touched.phones && index === 0 && Boolean(errors.phones?.[index])}
                                                        helperText={touched.phones && index === 0 && errors.phones?.[index]}
                                                    //required={index === 0}
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
                                                    <Typography variant="body2" ml={1} style={{ fontSize: '12px' }}>
                                                        {t('common.addAnotherPhoneNumber')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box sx={{ marginTop: "58px" }}>
                                            {values.emails.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={2}
                                                    sx={{ marginBottom: 1 }}
                                                >
                                                    <Field
                                                        as={TextField}
                                                        name={`emails[${index}]`}
                                                        type="tel"
                                                        label={`${t('company.form.field.email')} ${index + 1}`}
                                                        fullWidth
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const target = e.target;
                                                            const updatedEmails = [...emails];
                                                            updatedEmails[index] = target.value;
                                                            setEmails(updatedEmails);
                                                            setFieldValue("emails", updatedEmails);
                                                        }}
                                                        error={touched.emails && index === 0 && Boolean(errors.emails?.[index])}
                                                        helperText={touched.emails && index === 0 && errors.emails?.[index]}
                                                    //required={index === 0}
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
                                                    <Typography variant="body2" ml={1} style={{ fontSize: '12px' }}>
                                                        {t('common.addAnotherEmail')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box sx={{ marginTop: "55px" }}>
                                            {values.webs.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={2}
                                                    sx={{ marginBottom: 1 }}
                                                >
                                                    <Field
                                                        as={TextField}
                                                        name={`webs[${index}]`}
                                                        type="tel"
                                                        label={`${t('company.form.field.web')} ${index + 1}`}
                                                        fullWidth
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const target = e.target;
                                                            const updatedWebs = [...webs];
                                                            updatedWebs[index] = target.value;
                                                            setEmails(updatedWebs);
                                                            setFieldValue("webs", updatedWebs);
                                                        }}
                                                        error={touched.webs && index === 0 && Boolean(errors.webs?.[index])}
                                                        helperText={touched.webs && index === 0 && errors.webs?.[index]}
                                                    //required={index === 0}
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
                                                    <Typography variant="body2" ml={1} style={{ fontSize: '12px' }}>
                                                        {t('common.addAnotherWeb')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Kolumna 4 */}

                                    {/* <Box sx={{
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
                                        <ul>
                                            {departments.map((dept, index) => (
                                                <li
                                                    key={dept.uuid || index}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '2px 0',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    <span>{dept.name}</span>
                                                    <IconButton
                                                        onClick={() => handleEditDepartment(index)}
                                                        color="info"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleRemoveDepartment(index)}
                                                        color="error"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <RemoveCircleOutlineIcon />
                                                    </IconButton>
                                                </li>
                                            ))}
                                        </ul>
                                    </Box> */}
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
            </Dialog>
            {/* <CreateDepartmentModal
                open={isDepartmentModalOpen}
                onClose={() => { setDepartmentModalOpen(false); setEditingDepartment(null); }}
                onAddDepartment={department => { handleAddOrUpdateDepartment(department); }}
                initialData={editingDepartment}
                departments={departments}
            /> */}
        </div>
    );
};

export default AddCompanyModal;
