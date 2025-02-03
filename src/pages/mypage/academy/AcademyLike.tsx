import { useRecoilValue } from "recoil";
//import { getCookie } from "../../../utils/cookie";
import userInfo from "../../../atoms/userInfo";
import SideBar from "../../../components/SideBar";
import { Pagination } from "antd";
import jwtAxios from "../../../apis/jwt";
import { useEffect, useState } from "react";

function AcademyLike() {
  const [academyLikeList, setAcademyLikeList] = useState([]);
  const currentUserInfo = useRecoilValue(userInfo);

  let menuItems = [];
  switch (currentUserInfo.roleId) {
    case 3: //학원 관계자
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage/academy" },
        /*
        {
          label: "학원학생 관리",
          isActive: false,
          link: "/mypage/academy/student",
        },
        */
        {
          label: "학원리뷰 목록",
          isActive: false,
          link: "/mypage/academy/review",
        },
        { label: "좋아요 목록", isActive: true, link: "/mypage/academy/like" },
      ];
      break;
    case 2: //학부모
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        { label: "리뷰 목록", isActive: false, link: "/mypage/review" },
        { label: "학생 관리", isActive: true, link: "/mypage/like" },
      ];
      break;
    default: //일반학생
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "나의 학원정보", isActive: false, link: "/mypage" },
        { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: true, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
  }

  //학원 좋아요 전체목록 가져오기
  const getLikeList = async () => {
    try {
      const res = await jwtAxios.get(`/api/like/list?acaId=%&page=1&size=20`);
      setAcademyLikeList(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikeList();
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h1 className="title-font flex justify-between align-middle">
          좋아요 목록
        </h1>

        <div className="board-wrap">
          <div className="flex justify-between align-middle p-4 pl-6 pr-6 border-b">
            <div className="flex items-center justify-center w-full">
              회원 목록
            </div>
            <div className="flex items-center justify-center w-40">등록일</div>
            <div className="flex items-center justify-center w-40">
              삭제하기
            </div>
          </div>

          {academyLikeList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}

          <div className="loop-content flex justify-between align-middle p-6 border-b">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/aca_image_1.png" alt=" /" />
                </div>
                <div>
                  <div className="text-sm font-medium">둘리</div>
                  <div className="text-sm text-gray-500">학생</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-40">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">삭제하기</button>
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-6 border-b">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/aca_image_1.png" alt=" /" />
                </div>
                <div>
                  <div className="text-sm font-medium">고길동</div>
                  <div className="text-sm text-gray-500">학부모</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-40">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">삭제하기</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination defaultCurrent={1} total={100} showSizeChanger={false} />
        </div>
      </div>
    </div>
  );
}

export default AcademyLike;
