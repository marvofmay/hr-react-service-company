// import React from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import Role from '../../../types/Role';
// import { useTranslation } from 'react-i18next';

// interface AddRoleModalProps {
//     open: boolean;
//     onClose: () => void;
//     onAddRole: (newRole: Role) => void;
// }

// const AddRoleModal: React.FC<AddRoleModalProps> = ({ open, onClose, onAddRole }) => {
//     const { t } = useTranslation();

//     const validationSchema = Yup.object({
//         name: Yup.string().required(t('validation.fieldIsRequired')),
//         description: Yup.string(),
//     });

//     const initialValues: Role = {
//         uuid: '',
//         name: '',
//         description: '',
//         createdAt: '',
//         updatedAt: '',
//         deletedAt: null
//     };

//     const handleSubmit = (values: Role, { resetForm }: any) => {
//         onAddRole(values);
//         resetForm();
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//             <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
//                 {t('role.modal.add.title')}
//             </DialogTitle>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ errors, touched }) => (
//                     <Form noValidate>
//                         <DialogContent>
//                             <Field
//                                 as={TextField}
//                                 name="name"
//                                 label={t('role.form.field.name')}
//                                 fullWidth
//                                 margin="normal"
//                                 error={touched.name && Boolean(errors.name)}
//                                 helperText={touched.name && errors.name}
//                                 required
//                             />
//                             <Field
//                                 as={TextField}
//                                 name="description"
//                                 label={t('role.form.field.description')}
//                                 fullWidth
//                                 margin="normal"
//                                 multiline
//                                 rows={3}
//                                 error={touched.description && Boolean(errors.description)}
//                                 helperText={touched.description && errors.description}
//                             />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }}>
//                                 {t('common.button.cancel')}
//                             </Button>
//                             <Button type="submit" variant="contained" sx={{ backgroundColor: '#34495e', color: 'white', fontWeight: 'bold' }}>
//                                 {t('common.button.save')}
//                             </Button>
//                         </DialogActions>
//                     </Form>
//                 )}
//             </Formik>
//         </Dialog>
//     );
// };

// export default AddRoleModal;

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Role from '../../../types/Role';
import { useTranslation } from 'react-i18next';

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

    const [errorsAPI, setErrorsAPI] = useState<Object>();

    console.log('errorsAPI', errorsAPI);

    const handleSubmit = async (values: Role) => {
        try {
            await onAddRole(values);

            onClose();
        } catch (error: any) {
            console.log('error3', error);
            console.log('error4', error.response.data.errors);
            console.log('error.response?.status', error.response?.status);
            if (error.response?.status === 422) {
                console.log('error.response?.status2', error.response?.status);
                setErrorsAPI(error.response.data.errors);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('role.modal.add.title')}
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form noValidate>
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

export default AddRoleModal;
