import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

interface UserData {
    id: number;
    name: string;
    university: string;
    status: string;
}

const generateUniqueId = () => Math.floor(Math.random() * 1000);

const ColumnPage: React.FC = () => {
    const [data, setData] = useState<UserData[]>([]);
    const [input, setInput] = useState({
        name: '',
        university: '',
        status: 'current',
    });

    const handleInputChange = (key: string, value: string) => {
        setInput((prevInput) => ({ ...prevInput, [key]: value }));
    };

    const handleAddClick = () => {
        const newId = generateUniqueId();
        const newData: UserData = { id: newId, ...input };
        setData((prevData) => [...prevData, newData]);
        setInput({ name: '', university: '', status: 'current' });
    };

    const handleDeleteClick = (id: number) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'current':
                return 'green';
            case 'passed':
                return 'blue';
            case 'hold-on':
                return 'red';
            default:
                return 'black';
        }
    };


    return (
        <Grid container justifyContent="center" alignItems="flex-start" style={{ height: '100vh', marginTop: '40px' }}>
            <Grid item xs={8}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={input.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="University"
                                fullWidth
                                value={input.university}
                                onChange={(e) => handleInputChange('university', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={input.status}
                                    onChange={(e) => handleInputChange('status', e.target.value as string)}
                                >
                                    <MenuItem value="current">Current</MenuItem>
                                    <MenuItem value="passed">Passed</MenuItem>
                                    <MenuItem value="hold-on">Hold-on</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={handleAddClick}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>University</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.university}</TableCell>
                                        <TableCell style={{ color: getStatusColor(row.status) }}>{row.status}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(row.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            {/* this part for full raw to chnage the color */}
                            {/* <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        style={{ backgroundColor: row.status === 'current' ? 'lightgreen' : row.status === 'passed' ? 'lightblue' : 'lightcoral' }}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.university}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(row.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> */}
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ColumnPage;
