"use client"; // หากใช้ Client Component
import { useEffect, useState } from "react"; // นำเข้า useEffect และ useState
import Navbar from "../components/navbar1";
import BodyPart from "../components/body";
import Header from "../components/header1";
import Link from "next/link";
import shadows from "@mui/material/styles/shadows";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AddMember() {
  const [projects, setProjects] = useState([]); // สำหรับโปรเจกต์
  const [users, setUsers] = useState([]); // สำหรับผู้ใช้
  const [selectedProject, setSelectedProject] = useState(""); // เก็บโปรเจกต์ที่เลือก
  const [selectedUser, setSelectedUser] = useState(""); // เก็บผู้ใช้ที่เลือก
  const [isHoveredCreate, setIsHoveredCreate] = useState(false); // state สำหรับปุ่ม "Create project"
  const [isHoveredBack, setIsHoveredBack] = useState(false);
  const { data: session, status } = useSession();

  const getProjects = async () => {
    const res = await fetch(`http://localhost:3000/api/project/${session.user.id}/`);
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  };

  const getUsers = async () => {
    const res = await fetch(`http://localhost:3000/api/users`);
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
  };

  useEffect(() => {
    Promise.all([getProjects(), getUsers()])
      .then(([projectData, userData]) => {
        setProjects(projectData);
        setUsers(userData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSave = async () => {
    if (!selectedProject || !selectedUser) {
      alert("Please select both a project and a user");
      return;
    }

    const response = await fetch("/api/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectID: selectedProject,
        userID: selectedUser,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error:", errorText);
      alert("Failed to add member");
    } else {
      alert("Member added successfully");
      setSelectedProject("");
      setSelectedUser("");
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
              <h4 style={styles.h4}>Add Member</h4>
              <div style={styles.inputview}>
                <div style={styles.inputbox}>
                  <label style={styles.lable}>Projects :</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    style={styles.inp}
                  >
                    <option value="">Select a project</option>
                    {projects.map((item, index) => (
                      <option key={index} value={item.projectID}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.inputbox}>
                  <label style={styles.lable}>Users </label>
                  <a style={styles.lablea}>:</a>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    style={styles.inp}
                  >
                    <option value="">Select a user</option>
                    {users.map((item, index) => (
                      <option key={index} value={item.ID}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.subview}>
                <button
                  onClick={handleSave}
                  style={{
                    ...styles.buttom,
                    backgroundColor: isHoveredCreate ? "#45a049" : "#E8E8E8",
                  }}
                  onMouseEnter={() => setIsHoveredCreate(true)}
                  onMouseLeave={() => setIsHoveredCreate(false)}
                >
                  Save
                </button>
                <Link
                  href="/feed"
                  style={{
                    ...styles.buttom,
                    backgroundColor: isHoveredBack ? "#45a049" : "#E8E8E8",
                    textDecoration: "none",
                  }}
                  onMouseEnter={() => setIsHoveredBack(true)}
                  onMouseLeave={() => setIsHoveredBack(false)}
                >
                  Back
                </Link>
              </div>
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
    marginLeft: "30px",
  },
  subview: {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
  },
  page: {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: "10px",
    margin: "50px",
    width: "700px",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
};
