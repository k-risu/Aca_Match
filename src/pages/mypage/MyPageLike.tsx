import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { FaHeartCircleMinus } from "react-icons/fa6";
import CustomModal from "../../components/modal/Modal";
import { getCookie } from "../../utils/cookie";
import { useRecoilValue } from "recoil";
import userInfo from "../../atoms/userInfo";
import { jwtApiRequest } from "../../apis/jwt";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

function MyPageLike() {
  const [likeList, setLikeList] = useState([]); //좋아요 목록
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUserInfo = useRecoilValue(userInfo);
  const accessToken = getCookie("accessToken");
  const navigate = useNavigate();

  let menuItems = [];
  switch (currentUserInfo.roleId) {
    case 3: //학원 관계자
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        { label: "리뷰 목록", isActive: false, link: "/mypage/academy/review" },
        { label: "좋아요 목록", isActive: true, link: "/mypage/academy/like" },
      ];
      break;
    case 2: //학부모
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "자녀 관리", isActive: false, link: "/mypage/child" },
        { label: "자녀 학원정보", isActive: false, link: "/mypage" },
        { label: "자녀 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: true, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
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

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const fetchData = async (page: number) => {
    try {
      //좋아요 목록 호출
      const res = await jwtApiRequest.get(
        `/api/like/user?userId=${currentUserInfo.userId}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.resultData.length > 0) {
        console.log(res.data.resultData);
        setLikeList(res.data.resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h1 className="title-font">나의 좋아요 목록</h1>
        <div className="w-full border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              학원명
            </div>
            <div className="flex items-center justify-center w-20">
              삭제하기
            </div>
          </div>

          {likeList.map((item: any, index: number) => (
            <div
              key={index}
              className="loop-content flex justify-between align-middle p-4 border-b"
            >
              <div className="w-full flex justify-start items-center">
                <div
                  className="flex items-center gap-3"
                  onClick={() => navigate(`/academy/detail?id=${item.acaId}`)}
                >
                  <img
                    src={
                      item.acaPic
                        ? `http://112.222.157.156:5223/pic/academy/${item.acaId}/${item.acaPic}`
                        : "/aca_image_1.png"
                    }
                    alt=""
                  />
                  ABCDEFG 어학원_{item.acaId}_{item.acaPic}
                </div>
              </div>
              <div className="flex items-center justify-center w-20">
                <button
                  className="small_color_button w-full flex justify-center items-center"
                  onClick={() => setIsModalVisible(true)}
                >
                  <FaHeartCircleMinus size={20} color="#3b77d8" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination
            defaultCurrent={1}
            total={likeList.length}
            showSizeChanger={false}
            onChange={page => fetchData(page)}
          />
        </div>

        <CustomModal
          visible={isModalVisible}
          title={"좋아요 삭제하기"}
          content={"선택하신 학원을 좋아요에서 삭제하시겠습니까?"}
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

export default MyPageLike;
