const BodyPart = ({ children }) => {
  return (
    <div style={styles.bodyPart}>
      {children}
    </div>
  );
};

const styles = {
  bodyPart: {
    flexGrow: 1,
    padding: '25px',
    background: 'linear-gradient(#66CDAA, #F6E394)'
  },
};

export default BodyPart;