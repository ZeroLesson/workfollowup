"use client"; // หากใช้ Client Component
import { useRouter } from "next/navigation";
import { useState } from "react"; // นำเข้า useState
import Navbar from '../components/navbar1';
import Header from '../components/header1';
import BodyPart from '../components/body';
import Link from "next/link";
import {
  border,
  borderRadius,
  display,
  fontSize,
  fontWeight,
  margin,
  width,
} from "@mui/system";
import { Opacity } from "@mui/icons-material";
import { useSession } from "next-auth/react";

export default function AddProject() {
  const router = useRouter();
  const [name, setName] = useState(""); // สร้าง state สำหรับชื่อโปรเจกต์
  const [CID, setCID] = useState(""); // สร้าง state สำหรับสมาชิก
  const [error, setError] = useState(null); // สำหรับจัดการข้อผิดพลาด
  const [isHoveredCreate, setIsHoveredCreate] = useState(false); // state สำหรับปุ่ม "Create project"
  const [isHoveredBack, setIsHoveredBack] = useState(false);
  const { data: session, status } = useSession();
  const [data, setData] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่า session ถูกโหลดแล้ว
    if (!session || !session.user || !session.user.id) {
      setError("User is not authenticated");
      return;
    }

    console.log("Form Submitted, Project Name:", name, "CID:", session?.user?.id); // ตรวจสอบว่าค่าถูกต้อง

    const newProject = { name, CID: session?.user?.id };

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        const text = await res.text();
        setError("Failed to create project: " + text);
        return;
      }

      console.log("Project created, Fetching auto data...");
      const add = await fetch("/api/autoadd/" + session?.user?.id + '/');
      const datamember = await add.json();
      setData(datamember);

      console.log("Adding member to project...");
      const response = await fetch("/api/addmember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectID: datamember[0].projectID,
          userID: session?.user?.id,
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        setError("Failed to add member: " + responseText);
      } else {
        alert("Project created and member added successfully");
        router.push("/feed");
      }
    } catch (error) {
      setError("Failed to create project: " + error.message);
    }
  };


  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.mainContent}>
        <Header />
        <BodyPart>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
            rel="stylesheet"
          />
          <center>
            <div style={styles.page}>
              <br />
              <br />
              <br />
              <h4 style={styles.h4}>Create project</h4>
              <br />
              {error && <p style={{ color: "red" }}>{error}</p>}{" "}
              {/* แสดงข้อผิดพลาด */}
              <form onSubmit={handleSubmit}>
                <div style={styles.inputview}>
                  <div style={styles.inputbox}>
                    <label style={styles.lable}>Project name : </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={styles.inp}
                    />
                  </div>
                  
                </div>

                <div style={styles.subview}>
                  <button
                    type="submit"
                    style={{
                      ...styles.buttom,
                      backgroundColor: isHoveredCreate ? "#45a049" : "#E8E8E8",
                    }}
                    onMouseEnter={() => setIsHoveredCreate(true)}
                    onMouseLeave={() => setIsHoveredCreate(false)}
                  >
                    Create project
                  </button>

                  <Link href="/feed">
                    <button
                      style={{
                        ...styles.buttom,
                        backgroundColor: isHoveredBack ? "#45a049" : "#E8E8E8",
                      }}
                      onMouseEnter={() => setIsHoveredBack(true)}
                      onMouseLeave={() => setIsHoveredBack(false)}
                    >
                      Back
                    </button>
                  </Link>
                </div>
              </form>
            </div>
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
  buttom: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "14px",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "50px",
    textDecoration: "none",
    color: "black",
    transition: "background-color 0.3s ease",
    margin: "10px",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  h4: {
    fontSize: "70px",
    fontFamily: "Roboto Mono, monospace",
  },
  inputview: {
    backgroundColor: "white",
    height: "200px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "30px",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  inputbox: {
    margin: "20px",
  },
  lable: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  inp: {
    border: "none",
    borderRadius: "7px",
    margin: "7px",
    backgroundColor: "#D9D9D9",
  },
  inpt: {
    border: "none",
    borderRadius: "7px",
    margin: "7px",
    backgroundColor: "#D9D9D9",
    marginLeft: "7px",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  lablea: {
    fontSize: "20px",
    fontWeight: "bold",
    marginLeft: "50px",
  },
  subview: {
    margin: "30px",
  },
  page: {
    backgroundColor: "rgba(224, 232, 237, 0.5)",
    borderRadius: "10px",
    margin: "50px",
    width: "700px",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
};
