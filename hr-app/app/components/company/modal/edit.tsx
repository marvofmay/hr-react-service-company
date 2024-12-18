import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, MenuItem, IconButton, FormControlLabel, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Company from '../../../types/Company';
import fakeCompanies from '../../../fake_data/Companies';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface EditCompanyModalProps {
    open: boolean;
    onClose: () => void;
    company: Company | null;
    onSave: (updatedCompany: Company) => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ open, onClose, company, onSave }) => {
    const { t } = useTranslation();

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

    const initialValues: Company = {
        uuid: company?.uuid || '',
        companyUUID: company?.companyUUID || '',
        fullName: company?.fullName || '',
        active: company?.active || false,
        createdAt: company?.createdAt || '',
        updatedAt: company?.updatedAt || '',
        deletedAt: company?.deletedAt || '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required(t('validation.fieldIsRequired')),
        // phone: Yup.array()
        //     .min(1, "At least one phone number is required")
        //     .of(
        //         Yup.string()
        //             .test('is-not-empty', t('validation.fieldIsRequired'), (value, context) => {
        //                 console.log(context.parent[0]);
        //                 if (context.parent[0] === value || context.parent[0] === undefined || context.parent[0] === '') {
        //                     return false;
        //                 }
        //                 return true;
        //             })
        //             .required(t('validation.fieldIsRequired'))
        //     )
        //     .required(t('validation.fieldIsRequired')),
    });

    const filteredCompanies = fakeCompanies.filter(emp => emp.uuid !== company?.uuid && emp.active);

    const handleSubmit = (values: Company) => {
        if (company) {
            onSave({ ...company, ...values });
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.personalData')}</Typography>
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.employmentData')}</Typography>

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
                                    <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.addressData')}</Typography>

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
                                    <Typography sx={{ marginBottom: 1 }}>{t('company.form.box.systemData')}</Typography>

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

export default EditCompanyModal;