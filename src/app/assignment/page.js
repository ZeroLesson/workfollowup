"use client";
import Link from 'next/link';
import Navbar from '../../../components/navbar';
import BodyPart from "../../../components/body";
import Header from '../../../components/header';
import { SlArrowLeft } from "react-icons/sl";
import React, { useState, useEffect } from 'react';
import { analytics } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MdOutlineAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { ThreeDot } from 'react-loading-indicators';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
//import Animation_correct from '../../../public/Animation_correct.gif';

export default function Assignment() {
  const [isHoveredCancel, setIsHoveredCancel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fileref, setFileref] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [project, setProjectName] = useState(null);
  const [assignName, setAssignmentName] = useState(null);
  const [assign, setAssign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Have done yet');
  const [animat, setAnimation] = useState(false);
  const assign_num = 17;
  const date = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-CA', options).replace(/-/g, '');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('assignmentID');

  const handleFileChange = (event, projectName, assignmentName) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAssignmentName(assignmentName);
      setProjectName(projectName);
      console.log(project)
      setFileName(selectedFile.name); // ตั้งชื่อไฟล์
      setFile(selectedFile); // เก็บไฟล์ไว้ใน state
    } else {
      setFileName('ไม่มีไฟล์ที่เลือก');
      setFile(null); // รีเซ็ตไฟล์
    }
  };
  const handleSubmit = (event) => {

    console.log(file)

    if (file !== null) {
      setFileref(ref(analytics, project + '/' + assignName + '/' + formattedDate + '_' + fileName));
      setShowPopup(true);
      setStatus('uploading...');
      // uploadBytes(fileref,file[0]).then((data) => {
      // getDownloadURL(data.ref)
      // setStatus('You have done well');
      // setFile(null)
      //status change  }
    } else {
      alert('pls select file!!')
    }
  }
  const confirmUpload = async () => {
    if (fileref !== null) {
      uploadBytes(fileref, file[0]).then((data) => {
        getDownloadURL(data.ref);
        setStatus('You have done well');

        setAnimation(true);
        setTimeout(() => {
          setFile(null);
          setAnimation(false);
          setShowPopup(false); // ปิด popup หลังจากเล่น GIF 1 วินาที
          router.push('/feed')
        }, 3000);

        //setShowPopup(false);
      })
    } else {
      setStatus('เกิดข้อผิดพลาดในการอัปโหลดไฟล์!!');
      setShowPopup(false);
    }
  }
  const cancelUpload = () => {
    setShowPopup(false); // ซ่อน popup เมื่อกด Cancel
  };
  useEffect(() => {
    async function fetchGet() {
      try {
        const res = await fetch('http://localhost:3000/api/assignments/' + id);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        // const assignID = data.ID;
        console.log(data);
        setAssign(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchGet();
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.mainContent}>

        <Header>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;500&display=swap" rel="stylesheet" />
          <Link style={{ padding: '10px', Left: '0', position: 'relative' }} href="/">
            <SlArrowLeft style={{ position: 'absolute' }} size="40px" color="black" />
            <h style={{ color: 'black', fontSize: '30px', marginLeft: '40px' }}>Assignment </h>
          </Link>
          <h id="status" style={{ color: 'black', fontSize: '18px', marginLeft: '65%', marginTop: '10px' }}></h>
        </Header>
        <BodyPart>
          <div style={styles.midFrame}>
            <div style={styles.loading}>
              <ThreeDot color="#087308" size="medium" />

            </div>
          </div>
        </BodyPart>
      </div>
    </div>

  );




  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.mainContent}>

        <Header>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;500&display=swap" rel="stylesheet" />
          <Link style={{ padding: '10px', Left: '0', position: 'relative' }} href="/">
            <SlArrowLeft style={{ position: 'absolute' }} size="40px" color="black" />
            <h style={{ color: 'black', fontSize: '30px', marginLeft: '40px' }}>Assignment </h>
          </Link>
          <h id="status" style={{ color: 'black', fontSize: '18px', marginLeft: '65%', marginTop: '10px' }}>{status}</h>
        </Header>

        <BodyPart>
          <h>Assignment</h>
          <div style={styles.midFrame}>
            {assign.map(assign => {
              const dateStart = new Date(assign.startDate);
              const dayS = dateStart.getDate();
              const monthS = monthNames[dateStart.getMonth()]; // Get month name
              const yearS = dateStart.getFullYear();
              const dateEnd = new Date(assign.endDate);
              const dayE = dateEnd.getDate();
              const monthE = monthNames[dateEnd.getMonth()]; // Get month name
              const yearE = dateEnd.getFullYear();
              // onChange={(event)=>setFile(event.target.files)}
              return (

                <div style={styles.uploadFrame} key={assign.ID}>
                  <div style={{ position: 'relative', left: '20px', top: '5%' }}>
                    <h style={{ position: 'absolute', fontSize: '30px' }}>{assign.assignmentName}</h>
                    <h style={{ position: 'absolute', fontSize: '10px', marginTop: '40px' }}>{monthS} {dayS} - {monthE} {dayE}</h>
                    <h style={{ position: 'absolute', fontSize: '15px', marginTop: '70px' }}>{assign.description}</h>
                    <h style={{ position: 'absolute', fontSize: '15px', marginTop: '210px' }}>My Assignment</h>
                  </div>

                  <label htmlFor="fileUpload" style={{ display: 'inline-block', cursor: 'pointer', }} >
                    <MdOutlineAttachFile style={{ position: 'absolute', left: '20px', marginTop: '250px', fontSize: '20px' }} />
                    <span style={{ position: 'absolute', marginLeft: '40px', marginTop: '247px', fontSize: '15px' }}>
                      {file ? file.name : `select file`}
                    </span>
                  </label>
                  {/* <p>{files[assign.name]?.name || 'ไม่มีไฟล์ที่เลือก'}</p> */}
                  <input id="fileUpload" style={{ position: 'absolute', left: '35px', marginTop: '250px', display: 'none' }} type="file"
                    name="file" onChange={(event) => handleFileChange(event, assign.projectName, assign.assignmentName)} />

                  <button style={{ position: 'absolute', marginTop: '6px', marginLeft: '90%', cursor: 'pointer', border: 'none', backgroundColor: '#FFFFFF', fontSize: '40px' }} onClick={handleSubmit}><IoIosSend style={{ fontSize: '50px' }} /></button>

                  {/* <div style={{position:'relative',left:'20px',top:'5%'}}>
                          </div> */}

                  {showPopup && (
                    <div style={styles.popup}>
                      <div style={{
                        width: '500px',
                        height: '300px',
                        backgroundColor: 'white',
                        padding: '5px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',


                      }}>
                        <div>
                          <p style={{ position: 'absolute', fontSize: '20px', top: '50px', left: '230px' }}> Are you sure ? </p>
                          <p style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Upload File  :<strong>{file?.name}</strong>?</p>
                        </div>
                        <button onClick={confirmUpload}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          style={{
                            position: 'absolute',
                            marginTop: '150px',
                            marginLeft: '160px',
                            padding: '10px 15px',
                            backgroundColor: isHovered ? '#28A745' : '#247458',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                          }}>confirm</button>
                        <button onClick={cancelUpload}
                          onMouseEnter={() => setIsHoveredCancel(true)}
                          onMouseLeave={() => setIsHoveredCancel(false)}
                          style={{
                            position: 'absolute',
                            marginTop: '150px',
                            marginLeft: '260px',
                            padding: '10px 15px',
                            backgroundColor: isHoveredCancel ? '#DC3545' : '#D30404',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                          }}>cancel</button>
                      </div>
                    </div>
                  )}
                  {animat && (
                    <div style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1000,
                    }}>
                      <img src="/Animation_correct.gif" alt="Uploading..." />
                    </div>
                  )}
                </div>




              )
            })}
          </div>


          {/* <form onSubmit={handleSubmit}>
                        <input type="file" name="file" onChange={(event)=>setFile(event.target.files)} />
                        <button  type="submit">Upload</button>
                      </form> */}

        </BodyPart>


      </div>
    </div>

  )
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
  midFrame: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.3)',
    top: '20%',
    left: '55%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '50%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  uploadFrame: {
    position: 'absolute',
    width: '560px',
    height: '90%',
    background: 'rgba(255, 255, 255)',
    top: '5%',
    left: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  formFrame: {
    position: 'relative',
    left: '20px',
    top: '75%',

  },
  textInframe: {
    position: 'absolute',
    fontSize: '15px',
  },
  fileUploadlabel: {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  loading: {
    left: '44%',
    top: '45%',
    position: 'absolute',

  },
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

};


