import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SideBar from "../../components/SideBar";
import CustomModal from "../../components/modal/Modal";
import userInfo from "../../atoms/userInfo";
import { getCookie } from "../../utils/cookie";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../../apis/jwt";

function MyPage() {
  const [mypageAcademyList, setMypageAcademyList] = useState([]); //내 학원 내역
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUserInfo = useRecoilValue(userInfo);
  const accessToken = getCookie("accessToken");
  const navigate = useNavigate();

  let menuItems = [];
  let mypageUrl = "";
  switch (currentUserInfo.roleId) {
    case 3: //학원 관계자
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: true, link: "/mypage" },
        { label: "리뷰 목록", isActive: false, link: "/mypage/academy/review" },
        { label: "좋아요 목록", isActive: false, link: "/mypage/academy/like" },
      ];
      mypageUrl = "/mypage/academy";
      break;
    case 2: //학부모
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "자녀 관리", isActive: false, link: "/mypage/child" },
        { label: "자녀 학원정보", isActive: true, link: "/mypage" },
        { label: "자녀 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
      mypageUrl = "/mypage";
      break;
    default: //일반학생
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "나의 학원정보", isActive: true, link: "/mypage" },
        { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
      mypageUrl = "/mypage";
      break;
  }

  const myAcademyList = async (page: number) => {
    try {
      //좋아요 목록 호출
      const res = await jwtAxios.get(
        `/api/joinClass?userId=${currentUserInfo.userId}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.resultData.length > 0) {
        console.log(res.data.resultData);
        setMypageAcademyList(res.data.resultData);
      }
    } catch (error) {
      console.log(error);
    }
    //console.log(page);
  };

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    navigate(mypageUrl); //학원 관계자는 마이페이지 메인 리다이렉션
  }, []);

  useEffect(() => {
    myAcademyList(1);
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h1 className="title-font">나의 학원정보</h1>
        <div className="w-full gap-0 border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              학원명
            </div>
            <div className="flex items-center justify-center w-60">등록일</div>
            <div className="flex items-center justify-center w-40">
              처리상태
            </div>
            <div className="flex items-center justify-center w-40">
              취소하기
            </div>
          </div>

          {mypageAcademyList.map((item, index) => (
            <div
              key={index}
              className="loop-content flex justify-between align-middle p-4 border-b"
            >
              <div className="flex justify-start items-center w-full">
                <div className="flex items-center gap-3">
                  <div>
                    <img src="aca_image_1.png" alt=" /" />
                  </div>
                  <h4>{item.acaName}</h4>
                  {item.className}
                </div>
              </div>
              <div className="flex items-center justify-center w-60">
                2025-01-01
              </div>
              <div className="flex items-center justify-center w-40">
                등록완료
              </div>
              <div className="flex items-center justify-center w-40">
                <span className="small_line_button bg-gray-200 opacity-50">
                  취소하기
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination
            defaultCurrent={1}
            total={mypageAcademyList.length}
            showSizeChanger={false}
          />
        </div>

        <CustomModal
          visible={isModalVisible}
          title={"학원등록 취소하기"}
          content={"선택하신 학원을 등록 취소하시겠습니까?"}
          onButton1Click={handleButton1Click}
          onButton2Click={handleButton2Click}
          button1Text={"취소"}
          button2Text={"확인"}
          modalWidth={400}
          modalHeight={244}
        />
      </div>
    </div>
  );
}

export default MyPage;
