import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, MenuItem, FormControlLabel, Box, IconButton, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Employee from '../../../types/Employee';
import fakeCompanies from '../../../fake_data/Companies';
import fakeDepartments from '../../../fake_data/Departments';
import fakeEmployees from '../../../fake_data/Employees';
import fakePositions from '../../../fake_data/Positions';
import fakeContractTypes from '../../../fake_data/ContractTypes';
import fakeRoles from '../../../fake_data/Roles';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface AddEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    onAddEmployee: (newEmployee: Employee) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, onClose, onAddEmployee }) => {
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
        uuid: '',
        externalUUID: '',
        company: {
            uuid: '',
            name: '',
        },
        department: {
            uuid: '',
            name: '',
        },
        employeeSuperior: {
            uuid: '',
            firstName: '',
            lastName: '',
        },
        position: {
            uuid: '',
            name: '',
        },
        contractType: {
            uuid: '',
            name: '',
        },
        firstName: '',
        lastName: '',
        pesel: '',
        email: '',
        phone: [""],
        employmentFrom: '',
        employmentTo: '',
        active: false,
        address: {
            country: '',
            city: '',
            postcode: '',
            street: '',
        },
        role: {
            uuid: '',
            name: '',
        },
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t('validation.fieldIsRequired')),
        lastName: Yup.string().required(t('validation.fieldIsRequired')),
        pesel: Yup.string().required(t('validation.fieldIsRequired')),
        email: Yup.string().required(t('validation.fieldIsRequired')),
        company: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        department: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        employmentFrom: Yup.string().required(t('validation.fieldIsRequired')),
        position: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        role: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        address: Yup.object().shape({
            country: Yup.string().required(t('validation.fieldIsRequired')),
            city: Yup.string().required(t('validation.fieldIsRequired')),
            postcode: Yup.string().required(t('validation.fieldIsRequired')),
            street: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        contractType: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
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

    const handleSubmit = (values: Employee, { resetForm }: any) => {
        onAddEmployee(values);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('employee.modal.add.title')}
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
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
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="pesel"
                                        label={t('employee.form.field.pesel')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.pesel && Boolean(errors.pesel)}
                                        helperText={touched.pesel && errors.pesel}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="email"
                                        name="email"
                                        label={t('employee.form.field.email')}
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
                                                //required={index === 0}
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
                                        name="company.uuid"
                                        label={t('employee.form.field.company')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.company?.uuid && Boolean(errors?.company?.uuid)}
                                        helperText={touched?.company?.uuid && errors?.company?.uuid}
                                        required
                                    >
                                        {fakeCompanies.map(company => <MenuItem key={company.uuid} value={company.uuid}>{company.fullName}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="department.uuid"
                                        label={t('employee.form.field.department')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.department?.uuid && Boolean(errors?.department?.uuid)}
                                        helperText={touched?.department?.uuid && errors.department?.uuid}
                                        required
                                    >
                                        {fakeDepartments.map(department => <MenuItem key={department.uuid} value={department.uuid}>{department.name}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        name="externalUUID"
                                        label={t('employee.form.field.externalUUID')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="employeeSuperior.uuid"
                                        label={t('employee.form.field.employeeSuperior')}
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {fakeEmployees.map(employee => <MenuItem key={employee.uuid} value={employee.uuid}>{employee.lastName} {employee.firstName}</MenuItem>)}
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
                                        name="position.uuid"
                                        label={t('employee.form.field.position')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.position?.uuid && Boolean(errors?.position?.uuid)}
                                        helperText={touched?.position?.uuid && errors?.position?.uuid}
                                        required
                                    >
                                        {fakePositions.map(position => <MenuItem key={position.uuid} value={position.uuid}>{position.name}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="contractType.uuid"
                                        label={t('employee.form.field.contractType')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.contractType?.uuid && Boolean(errors.contractType?.uuid)}
                                        helperText={touched?.contractType?.uuid && errors.contractType?.uuid}
                                    >
                                        {fakeContractTypes.map(contractType => <MenuItem key={contractType.uuid} value={contractType.uuid}>{contractType.name}</MenuItem>)}
                                    </Field>
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
                                        name="address.country"
                                        label={t('employee.form.field.country')}
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
                                        label={t('employee.form.field.city')}
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
                                        label={t('employee.form.field.postcode')}
                                        fullWidth
                                        margin="normal"
                                        error={touched?.address?.postcode && Boolean(errors?.address?.postcode)}
                                        helperText={touched?.address?.postcode && errors?.address?.postcode}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        name="address.street"
                                        label={t('employee.form.field.street')}
                                        fullWidth
                                        margin="normal"
                                        error={touched?.address?.street && Boolean(errors?.address?.street)}
                                        helperText={touched?.address?.street && errors?.address?.street}
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
                                        name="role.uuid"
                                        label={t('employee.form.field.role')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.role?.uuid && Boolean(errors?.role?.uuid)}
                                        helperText={touched?.role?.uuid && errors?.role?.uuid}
                                        required
                                    >
                                        {fakeRoles.map(role => <MenuItem key={role.uuid} value={role.uuid}>{role.name}</MenuItem>)}
                                    </Field>
                                    <FormControlLabel
                                        control={
                                            <Field
                                                as={Checkbox}
                                                name="active"
                                                color="primary"
                                            />
                                        }
                                        label={t('employee.form.field.active')}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="createdAt"
                                        label={t('employee.form.field.createdAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="updatedAt"
                                        label={t('employee.form.field.updatedAt')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="deletedAt"
                                        label={t('employee.form.field.deletedAt')}
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
};

export default AddEmployeeModal;
