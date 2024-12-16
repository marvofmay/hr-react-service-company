import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, MenuItem, FormControlLabel, Select, InputLabel, FormControl } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Employee from '../../../types/Employee';
import fakeEmployees from '../../../fake_data/Employees';

interface EditEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ open, onClose, employee, onSave }) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t('validation.fieldIsRequired')),
        lastName: Yup.string().required(t('validation.fieldIsRequired')),
    });

    // Filtruj pracowników: aktywni i różni od edytowanego pracownika
    const filteredEmployees = fakeEmployees.filter(
        (emp) => emp.uuid !== employee?.uuid && emp.active
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('employee.modal.edit.title')}
            </DialogTitle>
            <Formik
                initialValues={{
                    employeeUUID: employee?.employeeUUID || '',
                    firstName: employee?.firstName || '',
                    lastName: employee?.lastName || '',
                    active: employee?.active || false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (employee) {
                        onSave({ ...employee, ...values });
                        onClose();
                    }
                }}
            >
                {({ values, errors, touched, handleChange }) => (
                    <Form>
                        <DialogContent>
                            <Field
                                as={TextField}
                                fullWidth
                                name="firstName"
                                label={t('employee.form.field.name')}
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                value={values.firstName}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                required
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                name="lastName"
                                label={t('employee.form.field.lastName')}
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                value={values.lastName}
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                            {/* FormControl and Select to choose employeeUUID */}
                            <FormControl fullWidth variant="outlined" margin="dense" error={touched.employeeUUID && Boolean(errors.employeeUUID)}>
                                <InputLabel>{t('employee.form.field.employeeUUID')}</InputLabel>
                                <Field
                                    as={Select}
                                    name="employeeUUID"
                                    value={values.employeeUUID} // Ustawienie domyślnej wartości
                                    onChange={handleChange}
                                    label={t('employee.form.field.employeeSuperior')} // Label dla Select
                                >
                                    {filteredEmployees.map((emp) => (
                                        <MenuItem key={emp.uuid} value={emp.uuid}>
                                            {emp.firstName} {emp.lastName}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Field
                                        as={Checkbox}
                                        name="active"
                                        color="primary"
                                        onChange={handleChange}
                                        checked={values.active}
                                    />
                                }
                                label={t('employee.form.field.active')}
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

export default EditEmployeeModal;