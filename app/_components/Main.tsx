import styles from "./main.module.css";

import Link from "next/link";

export const Main = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>메인 페이지!</h1>
        <p className={styles.description}>메인페이지입니다</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link href="/list">
            <button className={styles.button}>리스트 페이지로 이동</button>
          </Link>
          <Link href="/mypage">
            <button className={styles.button}>마이페이지로 이동</button>
          </Link>
        </div>
      </div>
    </>
  );
};
