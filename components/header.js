import Link from "next/link";

const Header = ({children}) => {
    return (
      <header style={styles.header}>
        <h1 style={styles.headerText}></h1>
        {children}
      </header>
    );
  };

  const styles = {
    header: {
    
      width: '100%',
      height: '10vh',
      backgroundColor: '#fff',
      color: 'white',
      display: 'flex',
      paddingLeft: '40px',
      paddingTop:'15px',
      
    },
    headerText: {
      margin: 0,
      fontSize: '20px',
      color:'white',
    }
  };

  export default Header;