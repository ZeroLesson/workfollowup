"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar1';
import Header from '../components/header1';
import BodyPart from '../components/body';
import { GrDocumentText } from "react-icons/gr";
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { useSession, signIn, signOut } from "next-auth/react";
import { IoIosAddCircle, IoIosLogOut } from "react-icons/io";

export default function page() {
    const searchParams = useSearchParams();
    const project_num = searchParams.get('projectID');
    const cid = searchParams.get('CID');
    const [assignmentName, setAssignmentName] = useState('');
    const [description, setDescription] = useState(''); // Updated field for description
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('On Track');
    const [projectID, setProjectID] = useState(project_num);
    const [percent, setPercent] = useState(0);

    const Swal = require('sweetalert2')

    const router = useRouter();

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleSignout = () => {
        if(session){
            signOut();
            router.push('/')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            projectID,
            name: assignmentName,
            description, // Pass the description
            startDate,
            endDate,
            status,
            percent
        };

        try {
            const response = await fetch('http://localhost:3000/api/addAsm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                await Swal.fire({
                    title: 'Success',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                router.push('/process?projectID=' + project_num + '&CID=' + cid).then(() => {
                    window.location.reload();
                });
            } else {
                throw new Error('Failed to submit form with status ' + response.status);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.mainContent}>
            <Header>
                    <div style={styles.leftHeader}>
                        
                    </div>
                    <div style={styles.rightHeader}>
                        <Button onClick={handleSignout}>
                            <IoIosLogOut size="40px" color="black" />
                        </Button>

                    </div>
                </Header>
                <BodyPart>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', justifyItems: 'center' }}>
                        <div style={{ margin: '5%', padding: '0px', background: '#f0f0f0', height: '60vh', width: '48vw', boxshadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                            <ul style={{ display: 'flex', background: '#45ffff', height: '8vh', alignItems: 'center', justifyContent: 'center' }}>
                                <span>
                                    <GrDocumentText size={35} color='white' />
                                </span>
                                <li style={{ marginLeft: '1%' }}>
                                    <h2 style={{ textAlign: 'center', fontSize: '200%', color: 'white', fontWeight: '600' }}>Add Assignment</h2>
                                </li>
                            </ul>
                            <form onSubmit={handleSubmit}>

                                <ul style={{ marginTop: '4.2%', display: 'flex' }}>
                                    <li style={{ width: '30%', marginLeft: '1.8%' }}>
                                        <label style={{ marginLeft: '2%', width: '30%', fontWeight: 'bold' }}>
                                            <span style={{ fontSize: '130%' }}>Assignment Name<em class="important" aria-label="Required" style={{ color: 'red' }}>*</em></span>
                                        </label>
                                    </li>
                                    <li>
                                        <InputForm
                                            value={assignmentName}
                                            onChange={e => setAssignmentName(e.target.value)}
                                            required
                                        />
                                    </li>
                                </ul>
                                <ul style={{ marginTop: '2%', display: 'flex' }}>
                                    <li style={{ width: '30%', marginLeft: '1.8%' }}>
                                        <label style={{ marginLeft: '2%', width: '30%', fontWeight: 'bold' }}>
                                            <span style={{ fontSize: '130%' }}>Desciption<em class="important" aria-label="Required" style={{ color: 'red' }}>*</em></span>
                                        </label>
                                    </li>
                                    <li>
                                        <InputForm
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            required
                                        />
                                    </li>
                                </ul>
                                <ul style={{ marginTop: '2%', display: 'flex' }}>
                                    <li style={{ width: '30%', marginLeft: '1.8%' }}>
                                        <label style={{ marginLeft: '2%', width: '30%', fontWeight: 'bold' }}>
                                            <span style={{ fontSize: '130%' }}>Start Date<em class="important" aria-label="Required" style={{ color: 'red' }}>*</em></span>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                if (e.target.value > endDate) {
                                                    setEndDate(e.target.value); // Auto-set endDate to startDate if startDate is after endDate
                                                }
                                            }}
                                            min={getTodayDate()} // Only allow selecting today or future dates
                                            style={{ width: '30vw', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '' }}
                                            required
                                        />
                                    </li>
                                </ul>
                                <ul style={{ marginTop: '2%', display: 'flex' }}>
                                    <li style={{ width: '30%', marginLeft: '1.8%' }}>
                                        <label style={{ marginLeft: '2%', width: '30%', fontWeight: 'bold' }}>
                                            <span style={{ fontSize: '130%' }}>End Date<em class="important" aria-label="Required" style={{ color: 'red' }}>*</em></span>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate || getTodayDate()} // End date must be same or after the start date
                                            style={{ width: '30vw', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '' }}
                                            required
                                        />
                                    </li>
                                </ul>
                                <ul style={{ marginTop: '2%', display: 'flex' }}>
                                    <li style={{ width: '30%', marginLeft: '1.8%' }}>
                                        <label style={{ marginLeft: '2%', width: '30%', fontWeight: 'bold' }}>
                                            <span style={{ fontSize: '130%' }}>Status<em class="important" aria-label="Required" style={{ color: 'red' }}>*</em></span>
                                        </label>
                                    </li>
                                    <li>
                                        <select
                                            value={status}
                                            onChange={e => setStatus(e.target.value)}
                                            style={{ width: '30vw', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '' }}
                                            required  // Ensures the input must be filled
                                        >
                                            <option value="">Select Status</option>
                                            <option value="On Track">On Track</option>
                                            <option value="At Risk">At Risk</option>
                                            <option value="Off Track">Off Track</option>
                                        </select>
                                    </li>
                                </ul>
                                <ul style={{ display: 'flex', marginTop: '4%', alignItems: 'center', justifyContent: 'center' }}>
                                    <li style={{ display: 'flex' }}>
                                        <div style={{ display: 'flex' }}>
                                            <button type='submit' style={buttonStyle}>Confirm</button>
                                        </div>
                                        <div style={{ display: 'flex', marginLeft: '4%' }}>
                                            <a href={`/process?projectID=${project_num}&CID=${cid}`} style={buttonStyle}>Cancel</a>
                                        </div>
                                    </li>
                                </ul>
                            </form>

                        </div>
                    </div>
                </BodyPart>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginLeft: '10vw',
    },
    leftHeader: {
        display: "flex",
        alignItems: "center",
      },
      rightHeader: {
        display: "flex",
        alignItems: "center",
      },
};

const buttonStyle = {
    position: 'relative',
    appearance: 'button',
    backgroundColor: '#1899D6',
    border: 'solid transparent',
    borderRadius: '16px',
    borderWidth: '0 0 4px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'din-round, sans-serif',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '.8px',
    lineHeight: '20px',
    margin: '0',
    outline: 'none',
    overflow: 'visible',
    padding: '13px 16px',
    textAlign: 'center',
    textTransform: 'uppercase',
    touchAction: 'manipulation',
    transform: 'translateZ(0)',
    transition: 'filter .2s',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
};

const InputForm = ({ value, onChange }) => {
    const inputStyle = {
        width: '30vw',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        outline: 'none',
    };

    const inputFocusStyle = {
        ...inputStyle,
        borderColor: '#1899D6',
        boxShadow: '0 0 5px rgba(24, 153, 214, 0.5)',
    };

    const [isFocused, setIsFocused] = useState(false);

    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            style={isFocused ? inputFocusStyle : inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
        />
    );
};
