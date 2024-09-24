"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import {
    TextField,
    Button,
    Box,
    Typography,
    LinearProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import Swal from 'sweetalert2';

const AssignmentDropdown = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectID = searchParams.get('projectID');
    const cid = searchParams.get('CID');

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await fetch("/api/percent/" + projectID + '/');
            const data = await response.json();
            setAssignments(data);
        };

        fetchAssignments();
    }, [projectID]);

    const handleSelectChange = (event) => {
        const selectedID = event.target.value;
        const assignment = assignments.find((a) => a.ID === selectedID);
        setSelectedAssignment(assignment);
        setPercent(assignment ? assignment.percent : 0);
        setStatus(assignment ? assignment.status : "");
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (selectedAssignment) {
            const response = await fetch(`/api/updateAsm/${selectedAssignment.ID}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ percent, status }),
            });
    
            if (response.ok) {
                await Swal.fire({
                    title: 'Success',
                    text: 'อัพเดทข้อมูลสำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                router.push('/process?projectID=' + projectID + '&CID=' + cid)
            } else {
                alert("เกิดข้อผิดพลาดในการบันทึก");
            }
        }
    };
    
    

    const handleChange = (event) => {
        const value = event.target.value;
        if (value >= 0 && value <= 100) {
            setPercent(value);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                maxWidth: "500px",
                margin: "auto",
                padding: 6,
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                background: "linear-gradient(135deg, #e9f7f7 30%, #cce7e8 90%)",
            }}
        >
            <Typography variant="h5" color="textPrimary" sx={{ fontWeight: "bold" }}>
                แก้ไขเปอร์เซ็นต์สถานะงาน
            </Typography>

            <FormControl fullWidth>
                <InputLabel id="assignment-select-label">เลือกงาน</InputLabel>
                <Select
                    labelId="assignment-select-label"
                    value={selectedAssignment ? selectedAssignment.ID.toString() : ""}
                    onChange={handleSelectChange}
                >
                    <MenuItem value="" disabled>
                        เลือกงาน
                    </MenuItem>
                    {assignments.map((assignment) => (
                        <MenuItem key={assignment.ID} value={assignment.ID}>
                            {assignment.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="status-select-label">เลือกสถานะ</InputLabel>
                <Select
                    labelId="status-select-label"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <MenuItem value="On Track">On Track</MenuItem>
                    <MenuItem value="At Risk">At Risk</MenuItem>
                    <MenuItem value="Off Track">Off Track</MenuItem>
                </Select>
            </FormControl>

            <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                    width: "100%",
                    height: 10,
                    borderRadius: 5,
                    marginBottom: 2,
                    backgroundColor: "#e0f7fa",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: percent > 50 ? "#388e3c" : "#d32f2f",
                        borderRadius: 5,
                    },
                }}
            />

            <TextField
                label="เปอร์เซ็นต์"
                type="number"
                value={percent}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                fullWidth
                required
                sx={{
                    "& .MuiInputBase-input": { textAlign: "center", fontWeight: "bold" },
                }}
            />

            <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{
                    padding: "10px 0",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#2e7d32",
                    "&:hover": {
                        backgroundColor: "#1b5e20",
                    },
                }}
            >
                บันทึก
            </Button>
        </Box>
    );
};

export default AssignmentDropdown;
