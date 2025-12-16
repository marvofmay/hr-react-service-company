import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, MenuItem, FormControlLabel, Box, IconButton, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Employee from '../../../types/Employee';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { FormikHelpers } from 'formik';

interface AddEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    onAddEmployee: (newEmployee: Employee) => void;
}

interface FormValues {
    phone: string[];
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, onClose, onAddEmployee }) => {
    const { t } = useTranslation();

    const MAX_PHONE_FIELDS = 3;

    const initialValues: Employee = {
        uuid: '',
        firstName: '',
        lastName: '',
        pesel: '',
        internalCode: '',
        externalCode: '',
        company: {
            uuid: '',
            fullName: '',
        },
        department: {
            uuid: '',
            name: '',
        },
        parentEmployee: {
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
        role: {
            uuid: '',
            name: '',
        },
        contacts: [],
        email: '',
        phones: [""],
        webs: [""],
        employmentFrom: new Date().toISOString().slice(0, 19).replace('T', ' '),
        active: false,
        address: {
            country: '',
            city: '',
            postcode: '',
            street: '',
        },
        employmentTo: '',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: '',
        deletedAt: ''
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t('validation.fieldIsRequired')),
        lastName: Yup.string().required(t('validation.fieldIsRequired')),
        pesel: Yup.string().required(t('validation.fieldIsRequired')),
        email: Yup.string().required(t('validation.fieldIsRequired')),
        employmentFrom: Yup.string().required(t('validation.fieldIsRequired')),
        company: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        department: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
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

    const handleSubmit = (values: Employee, formikHelpers: FormikHelpers<Employee>) => {
        onAddEmployee(values);
        formikHelpers.resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle
                sx={{
                    backgroundColor: '#34495e',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}
            >
                {t('employee.modal.add.title')}
            </DialogTitle>
        </Dialog>
    );
};

export default AddEmployeeModal;
