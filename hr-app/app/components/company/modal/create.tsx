import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, MenuItem, FormControlLabel, Box, IconButton, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Company from '../../../types/Company';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import fakeIdustries from "@/app/fake_data/Industries";

interface AddCompanyModalProps {
    open: boolean;
    onClose: () => void;
    onAddCompany: (newCompany: Company) => void;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose, onAddCompany }) => {
    const { t } = useTranslation();

    const initialValues: Company = {
        uuid: '',
        companyUUID: '',
        fullName: '',
        shortName: '',
        nip: '',
        regon: '',
        description: '',
        industry: {
            uuid: '',
            name: ''
        },
        address: {
            country: '',
            city: '',
            postcode: '',
            street: ''
        },
        active: true,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
    };

    const MAX_PHONE_FIELDS = 3;
    const [phones, setPhones] = useState([""])
    const handleAddPhone = (values: any, setFieldValue: any) => {
        if (values.phone.length < MAX_PHONE_FIELDS) {
            const newPhones = [...values.phone, ""];
            setPhones(newPhones);
            setFieldValue("phone", newPhones);
        }
    };

    const handleRemovePhone = (index: number, setFieldValue: any) => {
        const updatedPhones = [...phones];
        updatedPhones.splice(index, 1);
        setPhones(updatedPhones);
        setFieldValue("phone", updatedPhones);
    };

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

    const handleSubmit = (values: Company, { resetForm }: any) => {
        onAddCompany(values);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
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
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(5, 1fr)"
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
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(touched?.industry?.uuid && errors?.industry?.uuid)}
                                        helperText={touched?.industry?.uuid && errors?.industry?.uuid}
                                        required
                                    >
                                        {fakeIdustries.map(industry => <MenuItem key={industry.uuid} value={industry.uuid}>{industry.name}</MenuItem>)}
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
                                        <MenuItem value="1">Polska</MenuItem>
                                        <MenuItem value="2">Anglia</MenuItem>
                                        <MenuItem value="3">Niemcy</MenuItem>
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
                                        <MenuItem value="1">Gdańsk</MenuItem>
                                        <MenuItem value="2">Sopot</MenuItem>
                                        <MenuItem value="3">Gdynia</MenuItem>
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
                                </Box>
                                {/* Kolumna 5 */}
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.systemData')}</Typography>
                                    <FormControlLabel
                                        control={
                                            <Field
                                                as={Checkbox}
                                                name="active"
                                                color="primary"
                                            />
                                        }
                                        label={t('company.form.field.active')}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="createdAt"
                                        label={t('company.form.field.createdAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="updatedAt"
                                        label={t('company.form.field.updatedAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
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
    );
};

export default AddCompanyModal;
