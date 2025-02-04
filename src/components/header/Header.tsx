import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userInfo from "../../atoms/userInfo";
import { getCookie, removeCookie } from "../../utils/cookie";
import MainButton from "../button/MainButton";
import jwtAxios from "../../apis/jwt";
import { message } from "antd";

const SecondaryButton = styled(MainButton)`
  &:hover {
    background-color: #c4d9e9 !important;
    border-color: #c4d9e9 !important;
    color: #000 !important;
  }
`;
const menuItems = [
  { label: "학원 검색", link: "/academy" },
  { label: "화제의 학원", link: "/hotAcademy" },
  { label: "고객지원", link: "/support" },
  { label: "마이페이지", link: "/mypage" },
];

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const setUserInfo = useSetRecoilState(userInfo);
  const cookies = new Cookies();
  const currentUserInfo = useRecoilValue(userInfo);

  useEffect(() => {
    const accessToken = cookies.get("accessToken");

    if (accessToken) {
      const fetchUserData = async () => {
        try {
          const response = await jwtAxios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // 서버에서 받은 데이터 매핑
          const userData = {
            name: response.data.resultData.name, // 서버에서 받은 name
            roleId: response.data.resultData.roleId, // roleId를 문자열로 변환
            userId: response.data.resultData.userId, // userId를 문자열로 변환
          };

          console.log(response);

          setUserInfo(userData); // Recoil 상태 업데이트
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      fetchUserData();
    }
  }, [setUserInfo]);
  useEffect(() => {
    console.log("Current userInfo:", currentUserInfo);
  }, [currentUserInfo]); // userInfo가 변경될 때마다 로그 출력

  const logOut = async () => {
    try {
      const res = await jwtAxios.post("/api/user/log-out", {});
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const isMypage = (link: string) => {
    if (link.startsWith("/mypage") && !cookies.get("accessToken")) {
      navigate("/login");
      message.error("로그인이 필요한 서비스입니다.");
      return true; // 로그인 페이지로 이동했음을 나타냄
    }
    return false;
  };
  return (
    <header className={className}>
      <div className="w-[1280px] flex items-center justify-between mx-auto  ">
        <img
          src="/public/logo2.png"
          className="w-[160px] cursor-pointer mr-[full]"
          onClick={() => {
            navigate("/");
          }}
        />

        <div className="flex items-center gap-[30px]">
          <ul className="flex items-center gap-[30px]">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="w-[100px] hover:text-brand-BTBlueHover cursor-pointer justify-center text-center"
                onClick={() => {
                  if (!isMypage(item.link)) {
                    navigate(item.link);
                  }
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          {/* const accessToken = cookies.get('accessToken'); */}
          <div className="flex items-center gap-[15px]">
            {getCookie("accessToken") ? ( // 쿠키에 accessToken이 있는지 확인
              <div className="flex w-[185px] justify-end">
                <MainButton
                  onClick={() => {
                    // 로그아웃 처리 로직 추가
                    removeCookie("accessToken");
                    // 리코일 정보 삭제 아직 안함
                    logOut();
                    navigate("/");
                  }}
                  className={`px-4 py-2 w-[85px] h-[40px]`}
                >
                  로그아웃
                </MainButton>
              </div>
            ) : (
              <>
                <MainButton
                  type="primary"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className={`px-4 py-2 w-[85px] h-[40px]`}
                >
                  회원가입
                </MainButton>
                <SecondaryButton
                  onClick={() => {
                    navigate("/login");
                  }}
                  className={`px-4 py-2 w-[85px] h-[40px]`}
                >
                  로그인
                </SecondaryButton>
              </>
            )}
          </div>
          {/* <div className="flex items-center gap-[15px]">
            <MainButton
              type="primary"
              onClick={() => {
                navigate("/signup");
              }}
              className={`px-4 py-2 w-[85px] h-[40px]`}
            >
              회원가입
            </MainButton>
            <SecondaryButton
              onClick={() => {
                navigate("/login");
              }}
              className={`px-4 py-2 w-[85px] h-[40px]`}
            >
              로그인
            </SecondaryButton>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
