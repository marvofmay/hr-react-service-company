import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Department from '@/app/types/Department';

interface AddDepartmentModalProps {
    open: boolean;
    onClose: () => void;
    onAddDepartment: (newDepartment: Department) => void;
    initialData: Department | null;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ open, onClose, onAddDepartment, initialData }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('validation.fieldIsRequired')),
        description: Yup.string(),
        address: Yup.object().shape({
            country: Yup.string().required(t('validation.fieldIsRequired')),
            city: Yup.string().required(t('validation.fieldIsRequired')),
            postcode: Yup.string().required(t('validation.fieldIsRequired')),
            street: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        phone: Yup.string().required(t('validation.fieldIsRequired')),
    });

    const initialValues: Department = initialData || {
        uuid: '',
        // company: {
        //     uuid: '',
        //     name: '',
        // },
        departmentSuperior: {
            uuid: '',
            name: '',
        },
        name: '',
        description: '',
        address: {
            country: '',
            city: '',
            postcode: '',
            street: '',
        },
        phone: '',
        email: '',
        web: '',
        active: true,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: '',
        deletedAt: ''
    };

    const handleSubmit = (values: Department, { resetForm }: any) => {
        onAddDepartment(values);
        resetForm();
        onClose();
    };

    const handleClose = (resetForm: () => void) => {
        console.log(1123);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('department.modal.add.title')}
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, resetForm }) => (
                    <Form noValidate>
                        <DialogContent>
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, 1fr)"
                                gap={2}
                            >
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('department.form.box.mainData')}</Typography>
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
                                        name="description"
                                        label={t('department.form.field.description')}
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        rows={3}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Box>
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
                                        label={t('department.form.field.city')}
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
                                        label={t('company.form.field.street')}
                                        fullWidth
                                        margin="normal"
                                        error={touched?.address?.street && Boolean(errors?.address?.street)}
                                        helperText={touched?.address?.street && errors?.address?.street}
                                        required
                                    />
                                </Box>
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('department.form.box.additionalData')}</Typography>
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label={t('department.form.field.phone')}
                                        fullWidth
                                        margin="normal"
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        name="email"
                                        type="email"
                                        label={t('department.form.field.email')}
                                        fullWidth
                                        margin="normal"
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <Field
                                        as={TextField}
                                        name="web"
                                        label={t('department.form.field.web')}
                                        fullWidth
                                        margin="normal"
                                        error={touched.web && Boolean(errors.web)}
                                        helperText={touched.web && errors.web}
                                    />
                                </Box>
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('department.form.box.systemData')}</Typography>
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
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="createdAt"
                                        label={t('department.form.field.createdAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="updatedAt"
                                        label={t('department.form.field.updatedAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="deletedAt"
                                        label={t('department.form.field.deletedAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose(resetForm)} variant="contained" sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }}>
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
    );
};

export default AddDepartmentModal;
