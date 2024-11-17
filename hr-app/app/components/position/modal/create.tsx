import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Position from '../../../types/Position';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
});

interface AddPositionModalProps {
    open: boolean;
    onClose: () => void;
    onAddPosition: (newPosition: Position) => void;
}

const AddPositionModal: React.FC<AddPositionModalProps> = ({ open, onClose, onAddPosition }) => {
    const initialValues: Position = {
        uuid: '',
        name: '',
        description: '',
        active: true,
        created_at: '',
        updated_at: '',
        deleted_at: null
    };

    const handleSubmit = (values: Position, { resetForm }: any) => {
        onAddPosition(values);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Add New Position
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
                                name="name"
                                label="Name"
                                fullWidth
                                margin="normal"
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                required
                            />
                            <Field
                                as={TextField}
                                name="description"
                                label="Description"
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
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#1A237E', color: 'white', fontWeight: 'bold' }}>
                                Add
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AddPositionModal;
