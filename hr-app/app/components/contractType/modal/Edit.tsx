import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ContractType from '../../../types/ContractType';
import { useTranslation } from 'react-i18next';

interface EditContractTypeModalProps {
    open: boolean;
    onClose: () => void;
    ContractType: ContractType | null;
    onSave: (updatedContractType: ContractType) => void;
}

const EditContractTypeModal: React.FC<EditContractTypeModalProps> = ({ open, onClose, ContractType, onSave }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('validation.fieldIsRequired')),
        description: Yup.string(),
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('contractType.modal.edit.title')}
            </DialogTitle>
            <Formik
                initialValues={{
                    name: ContractType?.name || '',
                    description: ContractType?.description || '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (ContractType) {
                        onSave({ ...ContractType, ...values });
                        onClose();
                    }
                }}
            >
                {({ errors, touched, handleChange }) => (
                    <Form>
                        <DialogContent>
                            <Field
                                as={TextField}
                                fullWidth
                                name="name"
                                label={t('contractType.form.field.name')}
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                required
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                name="description"
                                label={t('contractType.form.field.description')}
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }} variant="contained">
                                {t('common.button.cancel')}
                            </Button>
                            <Button type="submit" sx={{ backgroundColor: '#34495e', color: 'white', fontWeight: 'bold' }} variant="contained">
                                {t('common.button.save')}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default EditContractTypeModal;
