import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface PreviewProps {
    open: boolean;
    title: string;
    details: { [key: string]: string | number | null };
    onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({ open, title, details, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {title}
            </DialogTitle>

            <DialogContent sx={{ marginTop: '10px', padding: '20px' }}>
                {Object.keys(details).length > 0 ? (
                    <div>
                        {Object.entries(details).map(([key, value]) => (
                            <p key={key}>
                                <strong>{key}:</strong> {value || 'N/A'}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>No details available.</p>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} sx={{ backgroundColor: '#1A237E', color: 'white', fontWeight: 'bold' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Preview;
