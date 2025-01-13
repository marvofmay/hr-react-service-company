import React, { useState } from 'react';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface CollapseSectionProps {
    title: string;
    inputLabel: string;
}

const CollapseSection: React.FC<CollapseSectionProps> = ({ title, inputLabel }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
        <Box flex="1 1 calc(25% - 16px)" minWidth="200px">
            <List component="nav">
                <ListItemButton
                    onClick={toggleOpen}
                    sx={{
                        backgroundColor: '#e5e7eb',
                        color: '#34495e',
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: '#34495e',
                            color: 'white',
                        },
                    }}
                >
                    <ListItemText primary={title} />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <TextField
                                fullWidth
                                label={inputLabel}
                                variant="outlined"
                            />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Box>
    );
};

export default CollapseSection;
