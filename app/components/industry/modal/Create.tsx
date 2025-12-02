import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Industry from '../../../types/Industry';
import { useTranslation } from 'react-i18next';

interface AddIndustryModalProps {
    open: boolean;
    onClose: () => void;
    onAddIndustry: (newIndustry: Industry) => void;
}

const AddIndustryModal: React.FC<AddIndustryModalProps> = ({ open, onClose, onAddIndustry }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('validation.fieldIsRequired')),
        description: Yup.string(),
    });

    const initialValues: Industry = {
        uuid: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: null
    };

    const handleSubmit = (values: Industry, helpers: FormikHelpers<Industry>) => {
        onAddIndustry(values);
        helpers.resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('industry.modal.add.title')}
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form noValidate>
                        <DialogContent>
                            <Field
                                as={TextField}
                                name="name"
                                label={t('industry.form.field.name')}
                                fullWidth
                                margin="normal"
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                required
                            />
                            <Field
                                as={TextField}
                                name="description"
                                label={t('industry.form.field.description')}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
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

export default AddIndustryModal;
