import Container1 from "../components/Container1";
import Container from "../components/Container";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.signIn}>
      <img
        className={styles.container86Icon}
        loading="eager"
        alt=""
        src="/container-86.svg"
      />
      <Container1 />
      <div className={styles.frameAdminFaculty}>
        <div className={styles.overlay1} />
        <Container />
      </div>
      <div className={styles.welcomeTo360Container}>
        <p className={styles.welcomeTo}>Welcome to</p>
        <p className={styles.p}>
          <span className={styles.span}> स्टूडेंट</span>
          <span className={styles.span1}>360</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
