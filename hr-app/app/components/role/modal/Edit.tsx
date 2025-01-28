import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Role from '../../../types/Role';
import { useTranslation } from 'react-i18next';

interface EditRoleModalProps {
    open: boolean;
    role: any | Role | null;
    onSave: (updatedRole: Role) => Promise<void>;
    onClose: () => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ open, role, onSave, onClose }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('validation.fieldIsRequired')),
        description: Yup.string(),
    });

    const [errorsAPI, setErrorsAPI] = useState<Object>();

    const handleSubmit = async (values: Role) => {
        try {
            if (role) {
                console.log(role);
                await onSave({ ...role, ...values });

                onClose();
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrorsAPI(error.response.data.errors);
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('role.modal.edit.title')}
            </DialogTitle>
            <Formik
                initialValues={{
                    uuid: role?.uuid || '',
                    name: role?.name || '',
                    description: role?.description || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleChange }) => (
                    <Form>
                        <DialogContent>
                            {errorsAPI && (
                                <div style={{ color: 'red', marginBottom: '1rem' }}>
                                    {Object.entries(errorsAPI).map(([key, value]) => (
                                        <ul key={key} style={{ marginBottom: '10px' }}>
                                            <li>
                                                <span>
                                                    <strong>{key}:</strong> {value}
                                                </span>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            )}
                            <Field
                                as={TextField}
                                fullWidth
                                name="name"
                                label={t('role.form.field.name')}
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
                                label={t('role.form.field.description')}
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

export default EditRoleModal;
