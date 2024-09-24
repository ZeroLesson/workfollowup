const Header = ({children}) => {
    return (
      <div style={styles.header}>
        <h1 style={styles.headerText}></h1>
        {children}
      </div>
    );
  };

  const styles = {
    header: {
      width: '100%',
      height: '10vh',
      backgroundColor: '#fff',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      margin: 0,
      fontSize: '24px',
    },
  };

export default Header;

