import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, MenuItem, FormControlLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Employee from '../../../types/Employee';
import { useTranslation } from 'react-i18next';

interface AddEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    onAddEmployee: (newEmployee: Employee) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, onClose, onAddEmployee }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t('validation.fieldIsRequired')),
        lastName: Yup.string().required(t('validation.fieldIsRequired')),
    });

    const initialValues: Employee = {
        uuid: '',
        employeeUUID: '',
        firstName: '',
        lastName: '',
        active: false,
        createdAt: '',
        updatedAt: '',
        deletedAt: null
    };

    const handleSubmit = (values: Employee, { resetForm }: any) => {
        onAddEmployee(values);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('employee.modal.add.title')}
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
                                name="firstName"
                                label={t('employee.form.field.firstName')}
                                fullWidth
                                margin="normal"
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                required
                            />
                            <Field
                                as={TextField}
                                name="lastName"
                                label={t('employee.form.field.lastName')}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                required
                            />
                            <Field
                                as={TextField}
                                select
                                fullWidth
                                name="employeeUUID"
                                label={t('employee.form.field.employeeUUID')}
                                variant="outlined"
                                margin="dense"
                                error={touched.employeeUUID && Boolean(errors.employeeUUID)}
                                helperText={touched.employeeUUID && errors.employeeUUID}
                            >
                                {/* Przykładowe opcje */}
                                <MenuItem value="1">Employee 1</MenuItem>
                                <MenuItem value="2">Employee 2</MenuItem>
                                <MenuItem value="3">Employee 3</MenuItem>
                            </Field>
                            <FormControlLabel
                                control={
                                    <Field
                                        as={Checkbox}
                                        name="active"
                                        color="primary"
                                        error={touched.active && Boolean(errors.active)}
                                    />
                                }
                                label={t('employee.form.field.active')}
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

export default AddEmployeeModal;
