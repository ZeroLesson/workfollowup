"use client";

import Link from "next/link";
import { CiUser, CiCalendar, CiAlignLeft, CiFileOn } from "react-icons/ci";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path ? '#E8E8E8' : '#247458';
  const iconColor = (path) => pathname === path ? 'black' : 'white';
  return (
    <div style={styles.sidebar}>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,900&display=swap" rel="stylesheet"/>
      <h2 style={styles.heading}>W F U</h2>
      <ul style={styles.ul}>
          <li style={{ ...styles.li, backgroundColor: isActive('/about') }}>
            <CiUser color={iconColor('/about')} style={{ strokeWidth: "1" }} />
            <div style={styles.li2}>
              <Link href="/about" style={{ ...styles.link, color: pathname === '/about' ? '#000' : '#fff' }}>
              Profile
            </Link>
            </div>
          </li>
        
          <li style={{ ...styles.li, backgroundColor: isActive('/') }}> {/* ข้างใน isActive , pathname , iconColor ให้ใส่path ที่กดแล้วจะไป ก็คือถ้าไม่อยู่หน้านั้นจพไม่เรียกใช้*/}
            <CiFileOn color={iconColor('/')} style={{ strokeWidth: "1" }} />
            <div style={styles.li2}>
              <Link href="/" style={{ ...styles.link, color: pathname === '/' ? '#000' : '#fff' }}>
                Feed
              </Link>
            </div>
          </li>
        
          <li style={{ ...styles.li, backgroundColor: isActive('/') }}>
            <CiAlignLeft color={iconColor('/service')} style={{ strokeWidth: "1" }} />
            <div style={styles.li2}>
              <Link href="/services" style={{ ...styles.link, color: pathname === '/services' ? '#000' : '#fff' }}>
                List
              </Link>
            </div>
          </li>
        
          <li style={{ ...styles.li, backgroundColor: isActive('/') }}> 
            <CiCalendar color={iconColor('/contact')} style={{ strokeWidth: "1" }}  />
            <div style={styles.li2}>
              <Link href="/contact" style={{ ...styles.link, color: pathname === '/contact' ? '#000' : '#fff' }}>
                Calendar
              </Link>
            </div>
          </li>
        
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "11vw",
    height: "100vh",
    backgroundColor: "#247458",
    padding: "20px",
    position: "fixed",
    top: "0",
    boxShadow: "4px 0 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "0 15px 15px 0",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "900",
    fontStyle: "italic",
  },
  ul: {
    listStyleType: "none",
    padding: 0,
  },
  li: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    padding: '10px',
    borderRadius: '10px',

  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  li2: {
    marginLeft: '10px'
  }
};

export default Navbar;
