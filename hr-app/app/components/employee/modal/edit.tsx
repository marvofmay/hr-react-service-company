import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, MenuItem, IconButton, FormControlLabel, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Employee from '../../../types/Employee';
import fakeEmployees from '../../../fake_data/Employees';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface EditEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ open, onClose, employee, onSave }) => {
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

    const initialValues: Employee = {
        uuid: employee?.uuid || '',
        companyUUID: employee?.companyUUID || '',
        company: employee?.company || '',
        departmentUUID: employee?.departmentUUID || '',
        department: employee?.department || '',
        employeeUUID: employee?.employeeUUID || '',
        positionUUID: employee?.positionUUID || '',
        contractTypeUUID: employee?.contractTypeUUID || '',
        firstName: employee?.firstName || '',
        lastName: employee?.lastName || '',
        birth: employee?.birth || '',
        email: employee?.email || '',
        phone: employee?.phone || [],
        employmentFrom: employee?.employmentFrom || '',
        employmentTo: employee?.employmentTo || '',
        active: employee?.active || false,
        country: employee?.country || '',
        city: employee?.city || '',
        postcode: employee?.postcode || '',
        address: employee?.address || '',
        roleUUID: employee?.roleUUID || '',
        createdAt: employee?.createdAt || '',
        updatedAt: employee?.updatedAt || '',
        deletedAt: employee?.deletedAt || '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t('validation.fieldIsRequired')),
        lastName: Yup.string().required(t('validation.fieldIsRequired')),
        birth: Yup.string().required(t('validation.fieldIsRequired')),
        email: Yup.string().required(t('validation.fieldIsRequired')),
        companyUUID: Yup.string().required(t('validation.fieldIsRequired')),
        departmentUUID: Yup.string().required(t('validation.fieldIsRequired')),
        employmentFrom: Yup.string().required(t('validation.fieldIsRequired')),
        positionUUID: Yup.string().required(t('validation.fieldIsRequired')),
        roleUUID: Yup.string().required(t('validation.fieldIsRequired')),
        country: Yup.string().required(t('validation.fieldIsRequired')),
        city: Yup.string().required(t('validation.fieldIsRequired')),
        postcode: Yup.string().required(t('validation.fieldIsRequired')),
        address: Yup.string().required(t('validation.fieldIsRequired')),
        contractTypeUUID: Yup.string().required(t('validation.fieldIsRequired')),
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

    // Filtruj pracowników: aktywni i różni od edytowanego pracownika
    const filteredEmployees = fakeEmployees.filter(
        (emp) => emp.uuid !== employee?.uuid && emp.active
    );

    const handleSubmit = (values: Employee) => {
        if (employee) {
            onSave({ ...employee, ...values });
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('employee.modal.edit.title')}
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.personalData')}</Typography>
                                    <Field
                                        as={TextField}
                                        name="firstName"
                                        label={t('employee.form.field.firstName')}
                                        value={values.firstName}
                                        onChange={handleChange}
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
                                        value={values.lastName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="birth"
                                        label={t('employee.form.field.birth')}
                                        value={values.birth}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.birth && Boolean(errors.birth)}
                                        helperText={touched.birth && errors.birth}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="email"
                                        name="email"
                                        label={t('employee.form.field.email')}
                                        value={values.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        required
                                    />
                                    <Box>
                                        {values.phone.map((_, index) => (
                                            <Box
                                                key={index}
                                                display="flex"
                                                alignItems="center"
                                                mb={2}
                                            >
                                                <Field
                                                    as={TextField}
                                                    name={`phone[${index}]`}
                                                    type="tel"
                                                    label={`${t('employee.form.field.phone')} ${index + 1}`}
                                                    fullWidth
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const target = e.target;
                                                        const updatedPhones = [...phones];
                                                        updatedPhones[index] = target.value;
                                                        setPhones(updatedPhones);
                                                        setFieldValue("phone", updatedPhones);
                                                    }}
                                                    error={touched.phone && index === 0 && Boolean(errors.phone?.[index])}
                                                    helperText={touched.phone && index === 0 && errors.phone?.[index]}
                                                    required={index === 0}
                                                />
                                                {index > 0 && (
                                                    <IconButton
                                                        onClick={() => handleRemovePhone(index, setFieldValue)}
                                                        color="error"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <RemoveCircleOutlineIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        ))}

                                        {phones.length < MAX_PHONE_FIELDS && (
                                            <Box display="flex" alignItems="center">
                                                <IconButton onClick={() => handleAddPhone(values, setFieldValue)} color="primary">
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                                <Typography variant="body2" ml={1}>
                                                    {t('common.addAnotherPhoneNumber')}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.employmentData')}</Typography>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="companyUUID"
                                        label={t('employee.form.field.company')}
                                        value={values.companyUUID}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.companyUUID && Boolean(errors.companyUUID)}
                                        helperText={touched.companyUUID && errors.companyUUID}
                                        required
                                    >
                                        <MenuItem value="1">Company 1</MenuItem>
                                        <MenuItem value="2">Company 2</MenuItem>
                                        <MenuItem value="3">Company 3</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="departmentUUID"
                                        label={t('employee.form.field.department')}
                                        value={values.departmentUUID}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.departmentUUID && Boolean(errors.departmentUUID)}
                                        helperText={touched.departmentUUID && errors.departmentUUID}
                                        required
                                    >
                                        <MenuItem value="1">Oddział 1</MenuItem>
                                        <MenuItem value="2">Oddział 2</MenuItem>
                                        <MenuItem value="3">Oddział 3</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="employeeUUID"
                                        label={t('employee.form.field.employeeSuperior')}
                                        value={values.employeeUUID}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {filteredEmployees.map((emp) => (
                                            <MenuItem key={emp.uuid} value={emp.uuid}>
                                                {emp.firstName} {emp.lastName}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="employmentFrom"
                                        label={t('employee.form.field.employmentFrom')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.employmentFrom && Boolean(errors.employmentFrom)}
                                        helperText={touched.employmentFrom && errors.employmentFrom}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="employmentTo"
                                        label={t('employee.form.field.employmentTo')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="positionUUID"
                                        label={t('employee.form.field.position')}
                                        value={values.positionUUID}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.positionUUID && Boolean(errors.positionUUID)}
                                        helperText={touched.positionUUID && errors.positionUUID}
                                        required
                                    >
                                        <MenuItem value="1">Position 1</MenuItem>
                                        <MenuItem value="2">Position 2</MenuItem>
                                        <MenuItem value="3">Position 3</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="contractTypeUUID"
                                        label={t('employee.form.field.contractType')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.contractTypeUUID && Boolean(errors.contractTypeUUID)}
                                        helperText={touched.contractTypeUUID && errors.contractTypeUUID}
                                    >
                                        <MenuItem value="1">contractType 1</MenuItem>
                                        <MenuItem value="2">contractType 2</MenuItem>
                                        <MenuItem value="3">contractType 3</MenuItem>
                                    </Field>
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.addressData')}</Typography>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="country"
                                        label={t('employee.form.field.country')}
                                        value={values.country}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.country && Boolean(errors.country)}
                                        helperText={touched.country && errors.country}
                                        required
                                    >
                                        <MenuItem value="Polska">Polska</MenuItem>
                                        <MenuItem value="Anglia">Anglia</MenuItem>
                                        <MenuItem value="Niemcy">Niemcy</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="city"
                                        label={t('employee.form.field.city')}
                                        value={values.city}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.city && Boolean(errors.city)}
                                        helperText={touched.city && errors.city}
                                        required
                                    >
                                        <MenuItem value="Gdańsk">Gdańsk</MenuItem>
                                        <MenuItem value="Sopot">Sopot</MenuItem>
                                        <MenuItem value="Gdynia">Gdynia</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        name="postcode"
                                        label={t('employee.form.field.postcode')}
                                        value={values.postcode}
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        error={touched.postcode && Boolean(errors.postcode)}
                                        helperText={touched.postcode && errors.postcode}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        name="address"
                                        label={t('employee.form.field.address')}
                                        value={values.address}
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address}
                                        required
                                    />
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
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.systemData')}</Typography>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="roleUUID"
                                        label={t('employee.form.field.role')}
                                        value={values.roleUUID}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched.roleUUID && Boolean(errors.roleUUID)}
                                        helperText={touched.roleUUID && errors.roleUUID}
                                        required
                                    >
                                        <MenuItem value="1">role 1</MenuItem>
                                        <MenuItem value="2">role 2</MenuItem>
                                        <MenuItem value="3">role 3</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="createdAt"
                                        label={t('employee.form.field.createdAt')}
                                        value={values.createdAt}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 1 }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="updatedAt"
                                        label={t('employee.form.field.updatedAt')}
                                        value={values.updatedAt}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="deletedAt"
                                        label={t('employee.form.field.deletedAt')}
                                        value={values.deletedAt}
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

    // return (
    //     <Dialog open={open} onClose={onClose}>
    //         <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
    //             {t('employee.modal.edit.title')}
    //         </DialogTitle>
    //         <Formik
    //             initialValues={{
    //                 employeeUUID: employee?.employeeUUID || '',
    //                 firstName: employee?.firstName || '',
    //                 lastName: employee?.lastName || '',
    //                 active: employee?.active || false,
    //             }}
    //             validationSchema={validationSchema}
    //             onSubmit={(values) => {
    //                 if (employee) {
    //                     onSave({ ...employee, ...values });
    //                     onClose();
    //                 }
    //             }}
    //         >
    //             {({ values, errors, touched, handleChange }) => (
    //                 <Form>
    //                     <DialogContent>
    //                         <Field
    //                             as={TextField}
    //                             fullWidth
    //                             name="firstName"
    //                             label={t('employee.form.field.name')}
    //                             variant="outlined"
    //                             margin="dense"
    //                             onChange={handleChange}
    //                             value={values.firstName}
    //                             error={touched.firstName && Boolean(errors.firstName)}
    //                             helperText={touched.firstName && errors.firstName}
    //                             required
    //                         />
    //                         <Field
    //                             as={TextField}
    //                             fullWidth
    //                             name="lastName"
    //                             label={t('employee.form.field.lastName')}
    //                             variant="outlined"
    //                             margin="dense"
    //                             onChange={handleChange}
    //                             value={values.lastName}
    //                             error={touched.lastName && Boolean(errors.lastName)}
    //                             helperText={touched.lastName && errors.lastName}
    //                         />

    //                         <FormControl fullWidth variant="outlined" margin="dense" error={touched.employeeUUID && Boolean(errors.employeeUUID)}>
    //                             <InputLabel>{t('employee.form.field.employeeUUID')}</InputLabel>
    //                             <Field
    //                                 as={Select}
    //                                 name="employeeUUID"
    //                                 value={values.employeeUUID}
    //                                 onChange={handleChange}
    //                                 label={t('employee.form.field.employeeSuperior')}
    //                             >
    //                                 {filteredEmployees.map((emp) => (
    //                                     <MenuItem key={emp.uuid} value={emp.uuid}>
    //                                         {emp.firstName} {emp.lastName}
    //                                     </MenuItem>
    //                                 ))}
    //                             </Field>
    //                         </FormControl>
    //                         <FormControlLabel
    //                             control={
    //                                 <Field
    //                                     as={Checkbox}
    //                                     name="active"
    //                                     color="primary"
    //                                     onChange={handleChange}
    //                                     checked={values.active}
    //                                 />
    //                             }
    //                             label={t('employee.form.field.active')}
    //                         />
    //                     </DialogContent>
    //                     <DialogActions>
    //                         <Button onClick={onClose} sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }} variant="contained">
    //                             {t('common.button.cancel')}
    //                         </Button>
    //                         <Button type="submit" sx={{ backgroundColor: '#34495e', color: 'white', fontWeight: 'bold' }} variant="contained">
    //                             {t('common.button.save')}
    //                         </Button>
    //                     </DialogActions>
    //                 </Form>
    //             )}
    //         </Formik>
    //     </Dialog>
    // );
};

export default EditEmployeeModal;