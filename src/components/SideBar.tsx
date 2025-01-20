import React, { ReactNode } from "react";

interface MenuItem {
  label: string;
  isActive: boolean;
}

interface SideBarProps {
  children?: ReactNode; // children의 타입을 ReactNode로 지정
  menuItems: MenuItem[]; // 외부에서 menuItems 배열을 전달받음
}

const SideBar: React.FC<SideBarProps> = ({ children, menuItems }) => {
  return (
    <div>
      <div className="w-[280px] mx-auto">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-2 px-5 gap-3 rounded-xl text-sm font-medium ${
              item.isActive ? "bg-gray-200 font-bold" : "bg-white"
            }`}
          >
            {item.label}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};

export default SideBar;
