import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Industry from '../../../types/Industry';

interface EditIndustryModalProps {
    open: boolean;
    onClose: () => void;
    industry: Industry | null;
    onSave: (updatedIndustry: Industry) => void;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().optional(),
});

const EditIndustryModal: React.FC<EditIndustryModalProps> = ({ open, onClose, industry, onSave }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Edit Industry
            </DialogTitle>
            <Formik
                initialValues={{
                    name: industry?.name || '',
                    description: industry?.description || '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (industry) {
                        onSave({ ...industry, ...values });
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
                                label="Name"
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                name="description"
                                label="Description"
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }} variant="contained">
                                Cancel
                            </Button>
                            <Button type="submit" sx={{ backgroundColor: '#1A237E', color: 'white', fontWeight: 'bold' }} variant="contained">
                                Save
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default EditIndustryModal;
