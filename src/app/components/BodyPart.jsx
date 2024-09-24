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
    background: 'linear-gradient(#66CDAA, #F6E394)',
    overflowY: 'auto', // เพิ่มบรรทัดนี้เพื่อให้มีการเลื่อนแนวตั้ง
    maxHeight: '100vh', // หรือกำหนดความสูงสูงสุดที่ต้องการ
  },
};

export default BodyPart;
