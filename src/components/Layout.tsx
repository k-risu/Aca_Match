import React, { ReactNode } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

interface LayoutProps {
  children?: ReactNode; // children의 타입을 ReactNode로 지정
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
