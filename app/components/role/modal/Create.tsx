"use client";

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Role from '../../../types/Role';
import { useTranslation } from 'react-i18next';
import CloseIcon from "@mui/icons-material/Close";

interface AddRoleModalProps {
    open: boolean;
    onClose: () => void;
    onAddRole: (newRole: Role) => Promise<void>;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ open, onClose, onAddRole }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('validation.fieldIsRequired')),
        description: Yup.string(),
    });

    const initialValues: Role = {
        uuid: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: null,
    };

    const [errorAPI, setErrorAPI] = useState<string | null>(null);

    const handleSubmit = async (values: Role) => {
        setErrorAPI(null); // czyścimy poprzedni błąd
        try {
            await onAddRole(values);
            onClose();
        } catch (error: unknown) {
            // jeśli backend zwraca { message: "Rola o nazwie 'aaa' już istnieje." }
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as any).response?.data?.message
            ) {
                setErrorAPI((error as any).response.data.message);
            } else {
                setErrorAPI('Wystąpił nieznany błąd');
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('role.modal.add.title')}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: '#ffffff', position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form noValidate>
                        <DialogContent>
                            {errorAPI && (
                                <div style={{ color: 'red', marginBottom: '1rem' }}>
                                    {errorAPI}
                                </div>
                            )}
                            <Field
                                as={TextField}
                                name="name"
                                label={t('role.form.field.name')}
                                fullWidth
                                margin="normal"
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                required
                            />
                            <Field
                                as={TextField}
                                name="description"
                                label={t('role.form.field.description')}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={onClose}
                                variant="contained"
                                sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }}
                            >
                                {t('common.button.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: '#34495e', color: 'white', fontWeight: 'bold' }}
                            >
                                {t('common.button.save')}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AddRoleModal;
