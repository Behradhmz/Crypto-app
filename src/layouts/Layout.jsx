import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>Behrad | React.js Full Course</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Behrad With &#9829;</p>
      </footer>
    </>
  );
}

export default Layout;
