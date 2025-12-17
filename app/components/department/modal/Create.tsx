import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Typography,
    MenuItem,
    Checkbox,
    FormControlLabel,
    IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Department from '@/app/types/Department';
import axios from "axios";
import { SERVICE_COMPANY_URL } from "@/app/utility/constans"

interface AddDepartmentModalProps {
    open: boolean;
    onClose: () => void;
    onAddDepartment: (department: Department) => Promise<void>;
    departments?: Department[];
}

interface CompanyListItemDTO {
    uuid: string;
    fullName: string;
    shortName: string;
    internalCode: string;
    nip: string;
    regon: string;
    description: string;
    active: boolean,
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({
    open,
    onClose,
    onAddDepartment,
}) => {
    const { t } = useTranslation();

    const MAX_FIELDS = 3;

    const initialValues: Department = {
        uuid: '',
        company: { uuid: '', fullName: '' },
        internalCode: '',
        parentDepartment: { uuid: '', name: '' },
        name: '',
        description: '',
        active: true,
        address: {
            country: '',
            city: '',
            postcode: '',
            street: '',
        },
        contacts: [],
        phones: [''],
        emails: [''],
        webs: [''],
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: '',
        deletedAt: '',
    };

    const [companies, setCompanies] = useState<{ uuid: string; fullName: string }[]>([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [errorCompanies, setErrorCompanies] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                setLoadingCompanies(true);

                const response = await axios.get(`${SERVICE_COMPANY_URL}/api/companies`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        active: true,
                        sortBy: "fullName",
                        sortDirection: "ASC",
                        pageSize: 1000
                    }
                });

                const items: CompanyListItemDTO[] = response.data.data.items ?? [];
                setCompanies(
                    items.map(({ uuid, fullName }) => ({ uuid, fullName }))
                );

                setErrorCompanies(null);
            } catch (err: any) {
                setErrorCompanies(t('department.failedToLoadTheCompanyList'));
            } finally {
                setLoadingCompanies(false);
            }
        };

        fetchCompanies();
    }, [open]);

    const [possibleParentDepartments, setPossibleParentDepartments] = useState<{ uuid: string; name: string, company: { uuid: string }; }[]>([]);
    const [loadingPossibleParentDepartments, setLoadingPossibleParentDepartments] = useState(true);
    const [errorPossibleParentDepartments, setErrorPossibleParentDepartments] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        const fetchPossibleParentDepartments = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                setLoadingPossibleParentDepartments(true);
                const response = await axios.get(`${SERVICE_COMPANY_URL}/api/departments?includes=company`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        active: true,
                        sortBy: "name",
                        sortDirection: "ASC",
                        pageSize: 1000
                    }
                });

                setPossibleParentDepartments(response.data.data.items || []);
                setErrorPossibleParentDepartments(null);
            } catch (err: any) {
                setErrorPossibleParentDepartments("Nie udało się pobrać listy firm");
            } finally {
                setLoadingPossibleParentDepartments(false);
            }
        };

        fetchPossibleParentDepartments();
    }, [open]);

    const validationSchema = Yup.object({
        name: Yup.string().required(t('validation.fieldIsRequired')),
        internalCode: Yup.string().required(t('validation.fieldIsRequired')),
        company: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        address: Yup.object().shape({
            country: Yup.string().required(t('validation.fieldIsRequired')),
            city: Yup.string().required(t('validation.fieldIsRequired')),
            postcode: Yup.string().required(t('validation.fieldIsRequired')),
            street: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        emails: Yup.array()
            .of(
                Yup.string()
                    .email(t('validation.invalidEmail'))
                    .nullable()
            )
    });

    const [errorAPI, setErrorAPI] = useState<string | null>(null);
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>(null);

    const handleSubmit = async (
        values: Department,
        helpers: FormikHelpers<Department>
    ) => {
        setErrorAPI(null);
        setErrorsAPI(null);

        try {
            await onAddDepartment(values);
            helpers.resetForm();
            onClose();
        } catch (error: unknown) {
            const err = error as any;

            const message = err?.response?.data?.message ?? 'Wystąpił nieznany błąd';
            const errors = err?.response?.data?.errors ?? null;

            setErrorAPI(message);
            setErrorsAPI(errors);
        }
    };

    const capitalizeFirst = (value: string): string =>
        value.charAt(0).toUpperCase() + value.slice(1);

    const renderDynamicFields = (
        type: 'phones' | 'emails' | 'webs',
        values: Department,
        setFieldValue: FormikHelpers<Department>['setFieldValue']
    ) => (
        <>
            {values[type].map((_, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                    <Field
                        as={TextField}
                        name={`${type}[${index}]`}
                        label={`${t(`department.form.field.${type.slice(0, -1)}`)} ${index + 1}`}
                        type={
                            type === 'emails'
                                ? 'email'
                                : type === 'webs'
                                    ? 'url'
                                    : 'text'
                        }
                        fullWidth
                    />
                    {index > 0 && (
                        <IconButton
                            color="error"
                            onClick={() =>
                                setFieldValue(
                                    type,
                                    values[type].filter((_, i) => i !== index)
                                )
                            }
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    )}
                </Box>
            ))}

            {values[type].length < MAX_FIELDS && (
                <Box display="flex" alignItems="center">
                    <IconButton
                        color="primary"
                        onClick={() =>
                            setFieldValue(type, [...values[type], ''])
                        }
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body2" fontSize="12px">
                        {t(`common.addAnother${capitalizeFirst(type.slice(0, -1))}`)}
                    </Typography>
                </Box>
            )}
        </>
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle
                sx={{
                    backgroundColor: '#34495e',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}
            >
                {t('department.modal.add.title')}
            </DialogTitle>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => {

                    useEffect(() => {
                        setFieldValue('parentDepartment.uuid', '');
                    }, [values.company.uuid]);

                    return (
                        <Form noValidate>
                            <DialogContent>
                                {errorAPI && (
                                    <div style={{ color: 'red', marginBottom: '1rem' }}>
                                        {errorAPI}
                                    </div>
                                )}

                                {errorsAPI && (
                                    <ul style={{ color: 'red', marginBottom: '1rem' }}>
                                        {Object.entries(errorsAPI).map(([field, msg]) => (
                                            <li key={field}>
                                                <strong>{field}:</strong> {msg}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(3, 1fr)"
                                    gap={2}
                                >
                                    {/* MAIN */}
                                    <Box sx={boxStyle}>
                                        <Typography>{t('department.form.box.mainData')}</Typography>

                                        <Field
                                            as={TextField}
                                            name="name"
                                            label={t('department.form.field.name')}
                                            fullWidth
                                            margin="normal"
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            required
                                        />

                                        <Field
                                            as={TextField}
                                            name="internalCode"
                                            label={t('department.form.field.internalCode')}
                                            fullWidth
                                            margin="normal"
                                            error={touched.internalCode && Boolean(errors.internalCode)}
                                            helperText={touched.internalCode && errors.internalCode}
                                            required
                                        />

                                        <Field
                                            as={TextField}
                                            name="description"
                                            label={t('department.form.field.description')}
                                            fullWidth
                                            margin="normal"
                                            multiline
                                            rows={3}
                                        />

                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="company.uuid"
                                            label={t('department.form.field.company')}
                                            margin="normal"
                                            error={touched?.company?.uuid && Boolean(errors?.company?.uuid)}
                                            helperText={touched?.company?.uuid && errors?.company?.uuid}
                                            required
                                        >
                                            {loadingCompanies && <MenuItem disabled>{t('common.loading')}</MenuItem>}
                                            {errorCompanies && <MenuItem disabled>{errorCompanies}</MenuItem>}
                                            {!loadingCompanies && companies.map(company => (
                                                <MenuItem key={company.uuid} value={company.uuid}>
                                                    {company.fullName}
                                                </MenuItem>
                                            ))}
                                        </Field>

                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="parentDepartment.uuid"
                                            label={t('department.form.field.parentDepartment')}
                                            margin="normal"
                                            disabled={!values.company.uuid}
                                        >
                                            <MenuItem value="">
                                                — {t('common.lack')} —
                                            </MenuItem>
                                            {loadingPossibleParentDepartments && <MenuItem disabled>{t('common.loading')}</MenuItem>}
                                            {errorPossibleParentDepartments && <MenuItem disabled>{errorPossibleParentDepartments}</MenuItem>}
                                            {!loadingPossibleParentDepartments &&
                                                possibleParentDepartments
                                                    .filter(ppd => ppd.company.uuid === values.company.uuid)
                                                    .map(ppd => (
                                                        <MenuItem key={ppd.uuid} value={ppd.uuid}>
                                                            {ppd.name}
                                                        </MenuItem>
                                                    ))}
                                        </Field>
                                    </Box>

                                    {/* ADDRESS */}
                                    <Box sx={boxStyle}>
                                        <Typography>{t('department.form.box.addressData')}</Typography>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="address.country"
                                            label={t('department.form.field.country')}
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
                                            label={t('department.form.field.city')}
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
                                            fullWidth
                                            margin="normal"
                                            error={touched?.address?.postcode && Boolean(errors?.address?.postcode)}
                                            helperText={touched?.address?.postcode && errors?.address?.postcode}
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            name="address.street"
                                            label={t('department.form.field.street')}
                                            fullWidth
                                            margin="normal"
                                            error={touched?.address?.street && Boolean(errors?.address?.street)}
                                            helperText={touched?.address?.street && errors?.address?.street}
                                            required
                                        />
                                    </Box>

                                    {/* CONTACTS */}
                                    <Box sx={boxStyle}>
                                        <Typography>{t('department.form.box.additionalData')}</Typography>

                                        <Box mt={2}>
                                            {renderDynamicFields('phones', values, setFieldValue)}
                                        </Box>

                                        <Box mt={4}>
                                            {renderDynamicFields('emails', values, setFieldValue)}
                                        </Box>

                                        <Box mt={4}>
                                            {renderDynamicFields('webs', values, setFieldValue)}
                                        </Box>
                                    </Box>
                                </Box>
                                {/* SYSTEM */}
                                <Box
                                    display="grid"
                                    gridTemplateColumns="1fr"
                                    gap={2}
                                    sx={boxStyle}
                                >
                                    <Typography>{t('department.form.box.systemData')}</Typography>
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
                                                label={t('department.form.field.active')}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </DialogContent>

                            <DialogActions>
                                <Button
                                    onClick={onClose}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#999a99',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('common.button.cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#34495e',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('common.button.save')}
                                </Button>
                            </DialogActions>
                        </Form>
                    )
                }}
            </Formik>
        </Dialog>
    );
};

const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    transition: 'border-color 0.3s ease',
    '&:hover': {
        borderColor: '#34495e',
    },
    marginTop: '5px',
};

export default AddDepartmentModal;
