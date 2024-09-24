"use client";
import Navbar from '../../../components/navbar';
import BodyPart from "../../../components/body";
import Header from '../../../components/header';
import Link from 'next/link';
import { SlArrowLeft } from "react-icons/sl";
import { VscCircleFilled } from "react-icons/vsc";
import { useState, useEffect } from 'react';
import {ThreeDot} from 'react-loading-indicators';

const AboutPage = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const [formattedDate, setFormattedDate] = useState([]);
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const project_num = '000000';
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  

  useEffect(() => {
    async function fetchGet() {
      try {
        const res = await fetch('http://localhost:3000/api/calender/'+project_num);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
 
        
        console.log(data);
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchGet();
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  if (loading) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.mainContent}>
          <Header>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;500&display=swap" rel="stylesheet"/>
            <Link style={{padding:'10px',Left:'0', position:'relative'}} href="/">
              <SlArrowLeft style={{ position:'absolute'}} size="40px" color="black"/>
              
              <h style={{color:'black',fontSize:'30px',marginLeft:'40px'}}>Calender</h>
            </Link>
          </Header>
          <BodyPart>
            <h1>Calender</h1>
            <div style={styles.midFrame}>
              <div style={styles.loading}>
              <ThreeDot color="#087308" size="medium" />
              
              </div>
            </div>
          </BodyPart>
        </div>
      </div>
    );
  }
  



  return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.mainContent}>
          
          <Header>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;500&display=swap" rel="stylesheet"/>
            <Link style={{padding:'10px',Left:'0', position:'relative'}} href="/">
              <SlArrowLeft style={{ position:'absolute'}} size="40px" color="black"/>
              <h style={{color:'black',fontSize:'30px',marginLeft:'40px'}}>Project</h>
            </Link>
          </Header>
            
          <BodyPart>
            <h1>Calender</h1>
            <div style={styles.midFrame}>
               {users.map(users => {
                 const status = "";
                 const date = new Date(users.endDate);
                 const day = date.getDate();
                 const month = monthNames[date.getMonth()]; // Get month name
                 const year = date.getFullYear();
                 const today = new Date();
                 const compareDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
                 const isPast = today > compareDate;
                 const isFuture = today < compareDate;
                 const options = { year: 'numeric', month: 'long', day: 'numeric' };
                 let messageColor;
                  if (isPast) {
                   messageColor = { color: 'red',marginLeft:'80px',marginTop:'10px' }; // สีแดงสำหรับอดีต
                  } else  
                    messageColor = { color: 'orange',marginLeft:'80px',marginTop:'10px' }; // สีส้มสำหรับวันที่ตรงกับวันนี้
                return(
                  <div style={styles.calenFrame} key={users.userID} >
                    <div style={{position:'absolute',margin:'15px'}}>
                      <h style={{}}>{users.projectName}</h><br/>
                      <h style={{top:'5px',alignItems:'center',fontSize:'14px'}}><VscCircleFilled  color="#66CDAA"/>{users.name}</h>
                    </div>
                    <div style={{position:'relative',marginLeft:'10px',top:'10px',left:'60%'}}>
                      <h>Due {day} {month} {year}</h>
                      <p style={messageColor}>
                        {isPast
                          ? "Late!!"
                          : isFuture
                          ? " "
                          : "Due Today!"
                        }
                      </p>
                    </div>
                </div>
                )
              })} 
            </div>
          </BodyPart>
        </div>
      </div>
    );
  };
const styles = {
  
    container: {
      
      display: 'flex',
      height: '100vh',
    },
    mainContent: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: "500",
      fontStyle: "normal",
      display: 'flex',
      flexDirection: 'column', 
      flexGrow: 1, 
      marginLeft: '10vw',
    },
    midFrame:{
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.3)',
      top: '20%',
      left: '55%',
      transform: 'translateX(-50%)',
      width: '600px',
      height: '50%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      overflow: 'auto',
    },
    topFrame: {
      color:'black',
    },
    calenFrame: {
      position:'relative',
      backgroundColor:'white',
      height: '80px',
      width: '90%',
      margin: '3%',
      marginLeft: '5%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
      display: 'flex',
    },
    poppinsThin: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: "100",
      fontStyle: "normal",
    },
    
    poppinsBold: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: "500",
      fontStyle: "normal",
    },
    loading: {
      left:'44%',
      top:'45%',
      position:'absolute',

    }
    

  };
export default AboutPage;