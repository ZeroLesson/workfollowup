"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar1';
import BodyPart from '../components/body';
import Header from '../components/header1';
import { IoIosAddCircle, IoIosLogOut } from "react-icons/io";
import { LuWrench } from "react-icons/lu";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import { SlArrowLeft } from "react-icons/sl";
import { Button } from '@mui/material';
import { OrbitProgress } from 'react-loading-indicators';

export default function Process() {

    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const project_num = searchParams.get('projectID');
    const cid = searchParams.get('CID');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status, router]);

    useEffect(() => {
        const getAssignment = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/api/assignment/${project_num}/`);

                if (res.status === 404) {
                    throw new Error('No assignments found');
                }

                if (!res.ok) {
                    throw new Error('Failed to fetch: ' + res.statusText);
                }

                const jsonData = await res.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message);
                setData([]); // Clear data on error
            } finally {
                setLoading(false); // Always stop loading regardless of success or failure
            }
        };

        if (project_num) {
            getAssignment();
        }
    }, [project_num]);

    const handleNavigation = () => {
        router.push('/updateAssignment/?projectID=' + project_num + '&CID=' + cid );
    };

    const handleNavigation2 = () => {
        router.push('/addAssignment?projectID=' + project_num + '&CID=' + cid);
    };

    const handleNavigation3 = () => {
        router.push('/feed');
    };

    const handleSignout = () => {
        if(session){
            signOut();
            router.push('/')
        }
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const ProjectStatus = ({ ID, name, startDate, endDate, status, percent }) => {
        const getStatusColor = () => {
            switch (status) {
                case "On Track": return "#66CDAA";
                case "At Risk": return "#F6E394";
                case "Off Track": return "#FF6347";
                default: return "#ddd"; // Default gray for undefined status
            }
        };

        return (
            <a href={'/assignment?assignmentID=' + ID} style={{ textDecoration: 'none' }}>
                <div style={{ margin: '10px', padding: '10px', background: '#f0f0f0', borderRadius: '8px', cursor: 'pointer' }}>
                    <h2>{name}</h2>
                    <p>
                        {new Date(startDate).toLocaleDateString('en-GB', options)} - {new Date(endDate).toLocaleDateString('en-GB', options)}
                    </p>
                    <div style={{ height: '20px', width: '100%', backgroundColor: '#ddd', borderRadius: '10px' }}>
                        <div style={{ width: `${percent}%`, height: '100%', backgroundColor: getStatusColor(), borderRadius: '10px' }}></div>
                    </div>
                    <small>Status: {status}</small>
                </div>
            </a>
        );
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.mainContent}>
            <Header>
                    <div style={styles.leftHeader}>
                        <button style={{ textDecoration: "none", position: "absolute", left: "180px", }} onClick={handleNavigation3}> {/* Add position:absolute and left */}
                            <SlArrowLeft size="40px" color="black" />
                            <span
                                style={{ color: "black", fontSize: "30px", marginLeft: "40%", position: "absolute", bottom: '0.1px' }}
                            >
                                Feed
                            </span>
                        </button>
                    </div>
                    <div style={styles.rightHeader}>
                        <Button onClick={handleSignout}>
                            <IoIosLogOut size="40px" color="black" />
                        </Button>

                    </div>
                </Header>

                <BodyPart>
                    <div style={styles.bodycenter}>
                        {/* Show data or handle loading / error */}
                        {loading ? (
                            <p style={{display: 'flex', alignContent: 'center'}}>
                                <OrbitProgress variant="dotted" color="#3f4443" size="medium" text="" textColor="" />
                            </p>
                        ) : error ? (
                            <p>{error === 'No assignments found' ? 'No Assignment' : 'Failed to load data'}</p>
                        ) : (
                            data && data.length > 0 ? (
                                data.map((project, index) => (
                                    <ProjectStatus
                                        key={index}
                                        ID = {project.ID}
                                        name={project.name}
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                        status={project.status}
                                        percent={project.percent}
                                    />
                                ))
                            ) : (
                                <p>No Assignment yet.</p>
                            )
                        )}
                    </div>
                    {/* Conditionally show buttons if session user ID matches CID */}
                    {session?.user?.id === cid && (
                        <>
                            <button onClick={handleNavigation} style={{ alignItems: 'center', alignContent: 'end', marginLeft: 'auto', float: 'right' }}>
                                <LuWrench size={75} color="white" />
                            </button>
                            <button onClick={handleNavigation2} style={{ alignItems: 'center', alignContent: 'end', marginLeft: 'auto', float: 'right' }}>
                                <IoIosAddCircle size={75} color='#fe3414' />
                            </button>
                        </>
                    )}
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
