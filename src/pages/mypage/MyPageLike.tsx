import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import CustomModal from "../../components/modal/Modal";
import { getCookie } from "../../utils/cookie";
import { useRecoilValue } from "recoil";
import userInfo from "../../atoms/userInfo";
import { jwtApiRequest } from "../../apis/jwt";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../components/button/LikeButton";

const usedRandomNumbers = new Set<number>();

function MyPageLike() {
  const [likeList, setLikeList] = useState([]); // 좋아요 목록
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUserInfo = useRecoilValue(userInfo);
  const accessToken = getCookie("accessToken");
  const navigate = useNavigate();

  // 각 학원의 좋아요 상태를 관리하기 위한 상태
  const [likeStates, setLikeStates] = useState<{ [key: number]: boolean }>({});

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

  const handleLikeChange = (academyId: number, newIsLiked: boolean) => {
    // 좋아요 상태 변경 시 해당 academyId에 대한 상태만 업데이트
    setLikeStates(prevStates => ({
      ...prevStates,
      [academyId]: newIsLiked,
    }));

    if (!newIsLiked) {
      setLikeList(prevList =>
        prevList.filter(item => item.acaId !== academyId),
      );
    }
  };

  const fetchData = async (page: number) => {
    try {
      // 좋아요 목록 호출
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

        // 초기 상태 설정: 좋아요 상태를 초기화
        const initialLikeStates = res.data.resultData.reduce(
          (acc, item) => {
            acc[item.acaId] = true; // 처음엔 모두 좋아요 상태로 설정
            return acc;
          },
          {} as { [key: number]: boolean },
        );

        setLikeStates(initialLikeStates);
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

          {likeList?.length === 0 && (
            <div className="p-4 border-b text-center">
              등록된 좋아요 학원이 없습니다.
            </div>
          )}

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
                    className="h-[60px] w-[60px] rounded-[20px]"
                    src={
                      (item.acaPic = `http://112.222.157.156:5223/pic/academy/${item.acaId}/${item.acaPic}`)
                    }
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      const randomNum = getRandomUniqueNumber();
                      target.src = `/default_academy${randomNum}.jpg`;
                    }}
                    alt=""
                  />
                  {item.acaName}
                </div>
              </div>
              <div className="flex items-center justify-center w-20">
                {/* 각 LikeButton 컴포넌트에 isLiked 상태를 개별적으로 전달 */}
                <LikeButton
                  academyId={item.acaId}
                  initialIsLiked={likeStates[item.acaId] || false} // 각 버튼의 상태
                  onLikeChange={newIsLiked =>
                    handleLikeChange(item.acaId, newIsLiked)
                  } // 상태 변경 시 처리
                />
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
          onButton1Click={() => setIsModalVisible(false)}
          onButton2Click={() => setIsModalVisible(false)}
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
