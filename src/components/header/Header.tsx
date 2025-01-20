import { useNavigate } from "react-router-dom";
import MainButton from "../button/Mainbutton";
import { useState } from "react";
import styled from "@emotion/styled";

const SecondaryButton = styled(MainButton)`
  &:hover {
    background-color: #c4d9e9 !important;
    border-color: #c4d9e9 !important;
    color: #000 !important;
  }
`;
const menuItems = [
  { label: "학원 검색", link: "/academy" },
  { label: "화재의 학원", link: "/fire-academy" },
  { label: "고객지원", link: "/support" },
  { label: "마이페이지", link: "/mypage" },
];

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };
  return (
    <header className={className}>
      <div className="w-[1440px] flex items-center justify-center mx-auto gap-[300px] ">
        <div
          className="w-[210px] h-[40px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          로고
        </div>
        <div className="flex items-center gap-[30px]">
          <ul className="flex items-center gap-[30px]">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="w-[100px] hover:text-brand-BTBlueHover cursor-pointer justify-center text-center"
                onClick={() => {
                  navigate(menuItems[index].link);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-[15px]">
            <MainButton
              type="primary"
              onClick={handleButton1Click}
              className={`px-4 py-2 w-[85px] h-[40px]`}
            >
              회원가입
            </MainButton>
            <SecondaryButton
              onClick={handleButton2Click}
              className={`px-4 py-2 w-[85px] h-[40px]`}
            >
              로그인
            </SecondaryButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
