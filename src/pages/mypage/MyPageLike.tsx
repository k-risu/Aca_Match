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

// Generate random unique number
const getRandomUniqueNumber = () => {
  if (usedRandomNumbers.size === 10) {
    usedRandomNumbers.clear(); // 모든 숫자가 사용되면 초기화
  }

  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * 10) + 1; // 1~10 사이의 랜덤 숫자
  } while (usedRandomNumbers.has(randomNum));

  usedRandomNumbers.add(randomNum);
  return randomNum;
};

function MyPageLike() {
  const [likeList, setLikeList] = useState<any[]>([]); // 좋아요 목록
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUserInfo = useRecoilValue(userInfo);
  const accessToken = getCookie("accessToken");
  const navigate = useNavigate();
  const [likeStates, setLikeStates] = useState<{ [key: number]: boolean }>({});
  const [totalLikesCount, setTotalLikesCount] = useState(0); // To track total items

  useEffect(() => {
    fetchData(1); // Fetch data when the component mounts
  }, [likeStates]);

  const handleLikeChange = (academyId: number, newIsLiked: boolean) => {
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
      const res = await jwtApiRequest.get(
        `/api/like/user?userId=${currentUserInfo.userId}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.resultData.length > 0) {
        setLikeList(res.data.resultData);
        setTotalLikesCount(res.data.totalCount); // Assuming API returns total count

        const initialLikeStates = res.data.resultData.reduce(
          (acc, item) => {
            acc[item.acaId] = true;
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
    fetchData(1); // Fetch data when the component mounts
  }, [likeList]);

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  let menuItems = [];
  switch (currentUserInfo.roleId) {
    case 3:
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        { label: "리뷰 목록", isActive: false, link: "/mypage/academy/review" },
        { label: "좋아요 목록", isActive: true, link: "/mypage/academy/like" },
      ];
      break;
    case 2:
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "자녀 관리", isActive: false, link: "/mypage/child" },
        { label: "자녀 학원정보", isActive: false, link: "/mypage" },
        { label: "자녀 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: true, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
      break;
    default:
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "나의 학원정보", isActive: false, link: "/mypage" },
        { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: true, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
  }

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

          {likeList.map((item, index) => (
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
                    src={`http://112.222.157.156:5223/pic/academy/${item.acaId}/${item.acaPic}`}
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
                <LikeButton
                  academyId={item.acaId}
                  initialIsLiked={likeStates[item.acaId] || false}
                  onLikeChange={newIsLiked =>
                    handleLikeChange(item.acaId, newIsLiked)
                  }
                  isMyLike={true}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination
            defaultCurrent={1}
            total={totalLikesCount}
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
