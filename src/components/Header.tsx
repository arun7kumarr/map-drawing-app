import ExportButton from "./ExportButton";

export default function Header() {
  return (
    <header style={styles.header}>
      <div>
        <h3 style={styles.name}>Arun Kumar</h3>
        <p style={styles.email}>arunkumaryadav6919@gmail.com</p>
      </div>

      <ExportButton />
    </header>
  );
}

const styles = {
  header: {
    height: "60px",
    width: "100%",
    backgroundColor: "#1e293b",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    boxSizing: "border-box" as const,
  },
  name: {
    margin: 0,
    fontSize: "16px",
  },
  email: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.8,
  },
};
