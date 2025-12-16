import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, MenuItem, IconButton, FormControlLabel, Box, Typography } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Department from '../../../types/Department';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import { SERVICE_COMPANY_URL } from "@/app/utility/constans";

interface EditDepartmentModalProps {
    open: boolean;
    onClose: () => void;
    department: Department | null;
    onSave: (updatedDepartment: Department) => Promise<void>;
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

const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({ open, onClose, department, onSave }) => {
    const { t } = useTranslation();

    const MAX_PHONE_FIELDS = 3;
    const MAX_EMAIL_FIELDS = 3;
    const MAX_WEB_FIELDS = 3;

    const getContactsByType = (type: "phone" | "email" | "website"): string[] => {
        const contacts = department?.contacts?.filter(c => c.type === type).map(c => c.data) || [];
        return contacts.length > 0 ? contacts : [""];
    };

    const initialValues: Department = {
        uuid: department?.uuid || '',
        name: department?.name || '',
        internalCode: department?.internalCode || '',
        description: department?.description || '',
        company: department?.company
            ? { uuid: department.company.uuid, fullName: department.company.fullName }
            : { uuid: '', fullName: '' },
        parentDepartment: department?.parentDepartment
            ? {
                uuid: department.parentDepartment.uuid,
                name: department.parentDepartment.name,
            }
            : { uuid: '', name: '' },
        address: department?.address
            ? {
                country: department.address.country,
                city: department.address.city,
                postcode: department.address.postcode,
                street: department.address.street,
            }
            : { country: '', city: '', postcode: '', street: '' },
        contacts: department?.contacts || [],
        phones: getContactsByType("phone"),
        emails: getContactsByType("email"),
        webs: getContactsByType("website"),
        active: department?.active ?? true,
        createdAt: department?.createdAt || '',
        updatedAt: department?.updatedAt || '',
        deletedAt: department?.deletedAt || '',
    };

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
    });

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

    const [errorAPI, setErrorAPI] = useState<string | null>(null);
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>(null);

    const handleSubmit = async (values: Department) => {
        setErrorAPI(null);
        setErrorsAPI(null);

        try {
            if (department) {
                const updatedDepartment = {
                    ...department,
                    ...values,
                }
                await onSave(updatedDepartment);
                onClose();
            }

        } catch (error: unknown) {
            const err = error as any;

            const message = err?.response?.data?.message ?? 'Wystąpił nieznany błąd';
            const errors = err?.response?.data?.errors ?? null;

            setErrorAPI(message);
            setErrorsAPI(errors);
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
                <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {t('department.modal.edit.title')}
                </DialogTitle>
                <Formik<Department>
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, handleChange }) => (
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
                                        <Typography sx={{ marginBottom: 1 }}>{t('department.form.box.mainData')}</Typography>
                                        <Field
                                            as={TextField}
                                            name="name"
                                            label={t('department.form.field.name')}
                                            value={values.name}
                                            onChange={handleChange}
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
                                            value={values.internalCode}
                                            onChange={handleChange}
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
                                            fullWidth
                                            name="company.uuid"
                                            value={values.company?.uuid}
                                            onChange={handleChange}
                                            label={t('department.form.field.company')}
                                            variant="outlined"
                                            margin="normal"
                                            error={touched?.company?.uuid && Boolean(errors?.company?.uuid)}
                                            helperText={touched?.company?.uuid && errors?.company?.uuid}
                                            required
                                        >
                                            {loadingCompanies && <MenuItem disabled>{t('common.loading')}</MenuItem>}
                                            {errorCompanies && <MenuItem disabled>{errorCompanies}</MenuItem>}
                                            {!loadingCompanies && companies.map(com => (
                                                <MenuItem key={com.uuid} value={com.uuid}>
                                                    {com.fullName}
                                                </MenuItem>
                                            ))}
                                        </Field>

                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="parentDepartment.uuid"
                                            value={values.parentDepartment?.uuid ?? ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const value = e.target.value;
                                                setFieldValue(
                                                    'parentDepartment',
                                                    value ? { uuid: value } : null
                                                );
                                            }}
                                            label={t('department.form.field.parentDepartment')}
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            <MenuItem value="">
                                                — {t('common.lack')} —
                                            </MenuItem>

                                            {loadingPossibleParentDepartments && (
                                                <MenuItem disabled>{t('common.loading')}</MenuItem>
                                            )}

                                            {errorPossibleParentDepartments && (
                                                <MenuItem disabled>{errorPossibleParentDepartments}</MenuItem>
                                            )}

                                            {!loadingPossibleParentDepartments &&
                                                possibleParentDepartments
                                                    .filter(ppd => ppd.uuid !== department?.uuid)
                                                    .map(ppd => (
                                                        <MenuItem key={ppd.uuid} value={ppd.uuid}>
                                                            {ppd.name}
                                                        </MenuItem>
                                                    ))}
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
                                        <Typography sx={{ marginBottom: 1 }}>{t('department.form.box.addressData')}</Typography>
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
                                            label={t('department.form.field.street')}
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
                                        <Typography sx={{ marginBottom: 3 }}>{t('department.form.box.additionalData')}</Typography>
                                        <Box sx={{ marginBottom: 8 }}>
                                            <FieldArray name="phones">
                                                {({ push, remove }) => (
                                                    <Box>
                                                        {values.phones.map((_, index) => (
                                                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`phones[${index}]`}
                                                                    type="tel"
                                                                    label={`${t('department.form.field.phone')} ${index + 1}`}
                                                                    fullWidth
                                                                    error={Boolean(
                                                                        (touched.phones as boolean[] | undefined)?.[index] &&
                                                                        (errors.phones as string[] | undefined)?.[index]
                                                                    )}
                                                                    helperText={
                                                                        (touched.phones as boolean[] | undefined)?.[index] &&
                                                                        (errors.phones as string[] | undefined)?.[index]
                                                                    }
                                                                //required={index === 0}
                                                                />

                                                                {index > 0 && (
                                                                    <IconButton
                                                                        onClick={() => remove(index)}
                                                                        color="error"
                                                                        sx={{ ml: 1 }}
                                                                    >
                                                                        <RemoveCircleOutlineIcon />
                                                                    </IconButton>
                                                                )}
                                                            </Box>
                                                        ))}

                                                        {values.phones.length < MAX_PHONE_FIELDS && (
                                                            <Box display="flex" alignItems="center">
                                                                <IconButton onClick={() => push('')} color="primary">
                                                                    <AddCircleOutlineIcon />
                                                                </IconButton>
                                                                <Typography variant="body2" ml={1}>
                                                                    {t('common.addAnotherPhone')}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                )}
                                            </FieldArray>
                                        </Box>
                                        <Box sx={{ marginBottom: 8 }}>
                                            <FieldArray name="emails">
                                                {({ push, remove }) => (
                                                    <Box>
                                                        {values.emails.map((_, index) => (
                                                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`emails[${index}]`}
                                                                    type="tel"
                                                                    label={`${t('department.form.field.email')} ${index + 1}`}
                                                                    fullWidth
                                                                    error={Boolean(
                                                                        (touched.emails as boolean[] | undefined)?.[index] &&
                                                                        (errors.emails as string[] | undefined)?.[index]
                                                                    )}
                                                                    helperText={
                                                                        (touched.emails as boolean[] | undefined)?.[index] &&
                                                                        (errors.emails as string[] | undefined)?.[index]
                                                                    }
                                                                //required={index === 0}
                                                                />

                                                                {index > 0 && (
                                                                    <IconButton
                                                                        onClick={() => remove(index)}
                                                                        color="error"
                                                                        sx={{ ml: 1 }}
                                                                    >
                                                                        <RemoveCircleOutlineIcon />
                                                                    </IconButton>
                                                                )}
                                                            </Box>
                                                        ))}

                                                        {values.emails.length < MAX_EMAIL_FIELDS && (
                                                            <Box display="flex" alignItems="center">
                                                                <IconButton onClick={() => push('')} color="primary">
                                                                    <AddCircleOutlineIcon />
                                                                </IconButton>
                                                                <Typography variant="body2" ml={1}>
                                                                    {t('common.addAnotherEmail')}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                )}
                                            </FieldArray>
                                        </Box>
                                        <Box>
                                            <FieldArray name="webs">
                                                {({ push, remove }) => (
                                                    <Box>
                                                        {values.webs.map((_, index) => (
                                                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`webs[${index}]`}
                                                                    type="tel"
                                                                    label={`${t('department.form.field.web')} ${index + 1}`}
                                                                    fullWidth
                                                                    error={Boolean(
                                                                        (touched.webs as boolean[] | undefined)?.[index] &&
                                                                        (errors.webs as string[] | undefined)?.[index]
                                                                    )}
                                                                    helperText={
                                                                        (touched.webs as boolean[] | undefined)?.[index] &&
                                                                        (errors.webs as string[] | undefined)?.[index]
                                                                    }
                                                                //required={index === 0}
                                                                />

                                                                {index > 0 && (
                                                                    <IconButton
                                                                        onClick={() => remove(index)}
                                                                        color="error"
                                                                        sx={{ ml: 1 }}
                                                                    >
                                                                        <RemoveCircleOutlineIcon />
                                                                    </IconButton>
                                                                )}
                                                            </Box>
                                                        ))}

                                                        {values.webs.length < MAX_WEB_FIELDS && (
                                                            <Box display="flex" alignItems="center">
                                                                <IconButton onClick={() => push('')} color="primary">
                                                                    <AddCircleOutlineIcon />
                                                                </IconButton>
                                                                <Typography variant="body2" ml={1}>
                                                                    {t('common.addAnotherWeb')}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                )}
                                            </FieldArray>
                                        </Box>
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('department.form.box.systemData')}</Typography>
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
                                                checked={values.active}
                                            />
                                        </Box>
                                        <Box>
                                            <Field
                                                as={TextField}
                                                type="datetime-local"
                                                name="createdAt"
                                                label={t('department.form.field.createdAt')}
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
                                                label={t('department.form.field.updatedAt')}
                                                value={values.updatedAt}
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
        </>
    );
};

export default EditDepartmentModal;