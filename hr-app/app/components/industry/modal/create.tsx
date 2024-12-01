import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Industry from '../../../types/Industry';
import '../../../i18n/i18n';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
});

interface AddIndustryModalProps {
    open: boolean;
    onClose: () => void;
    onAddIndustry: (newIndustry: Industry) => void;
}

const AddIndustryModal: React.FC<AddIndustryModalProps> = ({ open, onClose, onAddIndustry }) => {
    const { t } = useTranslation();

    const initialValues: Industry = {
        uuid: '',
        name: '',
        description: '',
        created_at: '',
        updated_at: '',
        deleted_at: null
    };

    const handleSubmit = (values: Industry, { resetForm }: any) => {
        onAddIndustry(values);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
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
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#1A237E', color: 'white', fontWeight: 'bold' }}>
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
