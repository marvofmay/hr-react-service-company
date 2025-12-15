import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, MenuItem, FormControlLabel, Box, IconButton, Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import Company from '../../../types/Company';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";;
import axios from "axios";
import { SERVICE_COMPANY_URL } from "@/app/utility/constans";

interface AddCompanyModalProps {
    open: boolean;
    onClose: () => void;
    onAddCompany: (newCompany: Company) => Promise<void>;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose, onAddCompany }) => {
    const { t } = useTranslation();

    const initialValues: Company = {
        uuid: '',
        parentCompany: {
            uuid: '',
            fullName: '',
            shortName: '',
            nip: '',
            regon: ''
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
        contacts: [],
        phones: [""],
        emails: [""],
        webs: [""],
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: '',
        deletedAt: '',
    };

    const MAX_PHONE_FIELDS = 3;
    const MAX_EMAIL_FIELDS = 3;
    const MAX_WEB_FIELDS = 3;

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
                        active: true,
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

    const [possibleParentCompanies, setPossibleParentCompanies] = useState<{ uuid: string; fullName: string }[]>([]);
    const [loadingPossibleParentCompanies, setLoadingPossibleParentCompanies] = useState(true);
    const [errorPossibleParentCompanies, setErrorPossibleParentCompanies] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        const fetchPossibleParentCompanies = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                setLoadingPossibleParentCompanies(true);
                const response = await axios.get(`${SERVICE_COMPANY_URL}/api/companies`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        sortBy: "fullName",
                        sortDirection: "ASC",
                        pageSize: 1000
                    }
                });

                setPossibleParentCompanies(response.data.data.items || []);
                setErrorPossibleParentCompanies(null);
            } catch (err: any) {
                setErrorPossibleParentCompanies("Nie udało się pobrać listy firm");
            } finally {
                setLoadingPossibleParentCompanies(false);
            }
        };

        fetchPossibleParentCompanies();
    }, [open]);

    const validationSchema = Yup.object({
        fullName: Yup.string().required(t('validation.fieldIsRequired')),
        description: Yup.string()
            .required(t('validation.fieldIsRequired'))
            .min(3, t('validation.minLength', { count: 3 })),
        nip: Yup.string().required(t('validation.fieldIsRequired')),
        regon: Yup.string().required(t('validation.fieldIsRequired')),
        internalCode: Yup.string().required(t('validation.fieldIsRequired')),
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
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>(null);

    const handleSubmit = async (values: Company, helpers: FormikHelpers<Company>) => {
        const companyData = {
            ...values,
        };

        setErrorAPI(null);
        setErrorsAPI(null);

        try {
            await onAddCompany(companyData);
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

    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
                <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {t('company.modal.add.title')}
                </DialogTitle>
                <Formik<Company>
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched }) => (
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
                                            required
                                        />
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="parentCompany.uuid"
                                            label={t('company.form.field.parentCompany')}
                                            margin="normal"
                                        >
                                            <MenuItem value="">
                                                — {t('common.lack')} —
                                            </MenuItem>
                                            {loadingPossibleParentCompanies && <MenuItem disabled>{t('common.loading')}</MenuItem>}
                                            {errorPossibleParentCompanies && <MenuItem disabled>{errorPossibleParentCompanies}</MenuItem>}
                                            {!loadingPossibleParentCompanies && possibleParentCompanies.map(ppc => (
                                                <MenuItem key={ppc.uuid} value={ppc.uuid}>
                                                    {ppc.fullName}
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
                                            <FieldArray name="phones">
                                                {({ push, remove }) => (
                                                    <Box>
                                                        {values.phones.map((_, index) => (
                                                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`phones[${index}]`}
                                                                    type="tel"
                                                                    label={`${t('company.form.field.phone')} ${index + 1}`}
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
                                        <Box sx={{ marginTop: "58px" }}>
                                            <FieldArray name="emails">
                                                {({ push, remove }) => (
                                                    <Box>
                                                        {values.emails.map((_, index) => (
                                                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`emails[${index}]`}
                                                                    type="tel"
                                                                    label={`${t('company.form.field.email')} ${index + 1}`}
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
                                        <Box sx={{ marginTop: "55px" }}>
                                            <FieldArray name="webs">
                                                {({ push, remove }) => (
                                                    <Box>
                                                        {values.webs.map((_, index) => (
                                                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`webs[${index}]`}
                                                                    type="tel"
                                                                    label={`${t('company.form.field.web')} ${index + 1}`}
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
        </div>
    );
};

export default AddCompanyModal;
