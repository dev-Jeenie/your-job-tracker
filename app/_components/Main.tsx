// import styles from "./main.module.css";

import { Button } from "@mantine/core";
import Link from "next/link"

// import Link from "next/link";

export const Main = () => {
  return (
    <>
      <Link href="/list">
        <Button>리스트 페이지로 이동</Button>
      </Link>
      <Link href="/mypage">
        <Button>마이페이지로 이동</Button>
      </Link>
    </>
  );
};
