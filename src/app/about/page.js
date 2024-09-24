"use client";

import Link from "next/link";
import BodyPart from "../components/body";
import Navbar from "../components/navbar1";
import Header from "../components/header1";
import Image from "next/image";
import { CiMail, CiPhone } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AboutPage() {
  const [data, setData] = useState([]); // ข้อมูลดั้งเดิม
  const [editMode, setEditMode] = useState(false); // ใช้เพื่อกำหนดสถานะแก้ไข
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getAboutPage = async () => {
      const res = await fetch("http://localhost:3000/api/users/000000");
      const result = await res.json();
      setData(result);
      setEditedData({
        name: result[0].name,
        email: result[0].email,
        phone: result[0].phone,
      });
    };
    getAboutPage();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("Data to be sent:", editedData); // log ข้อมูลที่จะส่ง

    // ส่งข้อมูลไปยัง API โดยไม่ตรวจสอบรูปแบบ
    try {
      const response = await fetch("http://localhost:3000/api/update/000000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.log("API response error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to update profile");
      }

      const updatedData = await response.json();
      console.log("Updated data from API:", updatedData);
      setData([updatedData]);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.mainContent}>
        <Header />
        <BodyPart>
          <div style={styles.bodyPartContent}>
            <div style={styles.leftSide}>
              {!editMode ? (
                <div>
                  <h1 style={styles.h1}>{editedData.name}</h1>
                  <h2 style={styles.h2}>{editedData.position}</h2>
                  <div style={styles.infoboxbox}>
                    <div style={styles.infobox}>
                      <p style={styles.p}>Your Email</p>
                      <div style={styles.info}>
                        <p>{editedData.email}</p>
                        <CiMail />
                      </div>
                    </div>
                    <div style={styles.infobox}>
                      <p style={styles.p}>Phone Number</p>
                      <div style={styles.info}>
                        <p>{editedData.phone}</p>
                        <CiPhone />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={styles.inputbox}>
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              )}
            </div>

            <div style={styles.rightSide}>
              <Image
                src="/images/profile.jpg"
                alt="My images"
                width={500}
                height={500}
                style={styles.photo}
              />
              <button
                style={{
                  ...styles.editbut,
                  backgroundColor: isHovered ? "#45a049" : "#E8E8E8", // Change color on hover
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
              >
                {editMode ? "Update Profile" : "Edit Profile"}
              </button>
            </div>
          </div>
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
  bodyPartContent: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: "20px",
  },
  leftSide: {
    flex: 1,
    padding: "10px",
    marginRight: "10px",
    height: "100%",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  rightSide: {
    flex: 1,
    padding: "10px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  info: {
    backgroundColor: "#E8E8E8",
    padding: "10px",
    borderRadius: "7px",
    margin: "10px",
    width: "20vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photo: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  editbut: {
    backgroundColor: "#E8E8E8",
    border: "none",
    color: "black",
    textAlign: "center",
    padding: "10px 27px",
    borderRadius: "20px",
    margin: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    width: "20vw",
    borderRadius: "7px",
    border: "1px solid #ccc",
    backgroundColor: "#E8E8E8",
    color: "black",
  },
  buttonHover: {
    backgroundColor: "#45a049", // สีเมื่อ hover
  },
  h1: {
    fontSize: "5rem",
  },
  h2: {
    fontSize: "1.5rem",
  },
  p: {
    margin: "11px",
  },
  infobox: {
    marginTop: "30px",
  },
  infoboxbox: {
    marginTop: "60px",
  },
  inputbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
