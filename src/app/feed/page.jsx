"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from "../components/navbar1";
import BodyPart from "../components/body";
import Header from "../components/header1";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { SlArrowLeft } from "react-icons/sl";
import { IoIosAddCircle, IoIosLogOut } from "react-icons/io";
import { Button } from '@mui/material';

const getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 128) + 128;
  const g = Math.floor(Math.random() * 128) + 128;
  const b = Math.floor(Math.random() * 128) + 128;
  return `rgb(${r}, ${g}, ${b})`;
};

export default function FeedPage() {
  const [data, setData] = useState([]); // State to store the fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignout = () => {
    if (session) {
      signOut();
      router.push('/')
    }
  }

  useEffect(() => {
    // Redirect to home page if unauthenticated
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      // Ensure session is fully loaded before making API call
      if (status === "authenticated" && session?.user?.id) {
        try {
          const res = await fetch(`http://localhost:3000/api/member/${session.user.id}/`);
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await res.json();
          setData(jsonData); // Update the data state
          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          setError(error.message);
          setLoading(false); // Set loading to false even if there is an error
        }
      }
    };

    fetchData();
  }, [status, session?.user?.id]); // Run effect when session or status changes

  if (loading) {
    return <p>Loading...</p>; // Render a loading message while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>; // Render an error message if fetching fails
  }

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
          <br />
          <h4>Team</h4>
          <br />
          <div style={styles.dataWrapper}>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.dataItem,
                    backgroundColor: getRandomLightColor(),
                  }}
                >
                  <Link href={`/process?projectID=${item.projectID}&CID=${item.CID}`} style={styles.link}>
                    {item.name}
                  </Link>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          <br />
          <center>
            <Link href="/addProject" style={styles.buttom}>
              New project
            </Link>
            <Link href="/addMember" style={styles.buttom}>
              Add Member
            </Link>
          </center>
        </BodyPart>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginLeft: "10vw",
  },
  dataWrapper: {
    display: "flex",
    flexWrap: "wrap", // ทำให้สามารถแยกข้อมูลในบรรทัดใหม่ได้ถ้าจำเป็น
    gap: "10px", // ระยะห่างระหว่างไอเทม
  },
  dataItem: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "14px",
    backgroundColor: "white",
    minWidth: "150px", // ความกว้างขั้นต่ำของแต่ละรายการ
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // จัดกลางในแนวนอน
    justifyContent: "center", // จัดกลางในแนวตั้ง
    textAlign: "center", // จัดข้อความกลาง
    height: "100px", // ความสูงของกรอบ
  },
  link: {
    textDecoration: "none", // เอาเส้นใต้ลิ้งออก
    color: "inherit", // ใช้สีของข้อความในลิ้ง
  },
  buttom: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "14px",
    backgroundColor: "white",
    alignItems: "center", // จัดกลางในแนวนอน
    justifyContent: "center", // จัดกลางในแนวตั้ง
    textAlign: "center", // จัดข้อความกลาง
    height: "50px", // ความสูงของกรอบ
    textDecoration: "none", // เอาเส้นใต้ลิ้งออก
    color: "inherit", // ใช้สีของข้อความในลิ้ง
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
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
