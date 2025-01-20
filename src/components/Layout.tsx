import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

interface LayoutProps {
  children?: ReactNode; // children의 타입을 ReactNode로 지정
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation(); // 현재 경로 확인

  // 특정 경로에서 Header와 Footer를 숨기기 위한 배열
  const noLayoutPaths = ["/login", "/signup", "/signup/end"];
  const noSideBarPaths = ["/signup", "/signup/end", "/"];

  // 현재 경로가 noLayoutPaths에 포함되어 있으면 Header와 Footer를 숨김
  const isLayoutVisible = !noLayoutPaths.includes(pathname);
  const isSideBarVisible = !noSideBarPaths.includes(pathname);

  return (
    <div>
      {isLayoutVisible && (
        <Header className="sticky top-0 left-0 right-0 z-50 flex items-center h-[64px] bg-white border-b border-brand-BTWhite" />
      )}
      <main className={"flex w-[1440px] mx-auto"}>{children}</main>
      {isLayoutVisible && (
        <Footer className="w-[1440px] h-[100px] flex-col-center mx-auto bg-[#0E161B] text-white text-[14px]" />
      )}
    </div>
  );
};

export default Layout;
