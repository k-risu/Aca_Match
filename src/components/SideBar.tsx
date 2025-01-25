import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  label: string;
  isActive: boolean;
  link: string;
}

interface SideBarProps {
  children?: ReactNode; // children의 타입을 ReactNode로 지정
  menuItems: MenuItem[]; // 외부에서 menuItems 배열을 전달받음
  className?: string;
}
/**
 * 사이드바 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} [props.children] - 자식 컴포넌트 (선택적)
 * @param {MenuItem[]} props.menuItems - 메뉴 아이템 배열 (필수)
 * @param {string} [props.className] - 추가 스타일 클래스 (선택적)
 * @param {string} props.menuItems[].label - 메뉴 아이템의 표시 텍스트 (필수)
 * @param {boolean} props.menuItems[].isActive - 메뉴의 활성화 상태 (필수)
 * @param {string} props.menuItems[].link - 메뉴 아이템의 이동 경로 (필수)
 * @returns {JSX.Element} 사이드바 컴포넌트
 */
const SideBar: React.FC<SideBarProps> = ({
  children,
  menuItems,
  className,
}) => {
  const navigate = useNavigate();
  return (
    <div className={`mt-[93px] ${className}`}>
      <div className="w-[280px]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(item.link);
            }}
            className={`flex items-center p-2 px-5 gap-3 rounded-xl text-sm font-medium cursor-pointer ${
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
