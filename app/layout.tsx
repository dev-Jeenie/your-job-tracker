"use client"

import { Container, createTheme, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AuthContext from "./context/AuthContext";
import { Header } from "./_components/Header";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  // # queryclient를 useState로 관리하는 이유?
  // ## Lazy Initialization
  // 기존처럼 client={new QueryClient()}를 전달하면 매 랜더링시마다 불필요하게 새로운 인스턴스를 생성한다.
  // 한번만 생성하기 위해초기 렌더링 시에만 이 함수를 실행해 useState의 인자로 함수를 전달
  // 처음 생성된 인스턴스를 계속 재사용함

  return (
    <html>
      <body>
        <AuthContext>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <Notifications />
            <Header/>
            {children}
          </MantineProvider>
        </QueryClientProvider>
        </AuthContext>
      </body>
    </html>


  );
}
