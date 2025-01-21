import { useEffect, useState } from "react";
import Pages from "../../components/page/Pages";
import SideBar from "../../components/SideBar";
import { FaHeartCircleMinus } from "react-icons/fa6";
import CustomModal from "../../components/modal/Modal";

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
  { label: "나의 학원정보", isActive: false, link: "/mypage" },
  { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: true, link: "/mypage/like" },
];

function MyPageLike() {
  const [totalItems, setTotalItems] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const fetchData = (page: number) => {
    //axios 데이터 호출할 때 페이지당 갯수랑 페이지 번호 전달
    setTotalItems(10);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h2 className="flex items-center justify-between pb-3 text-3xl font-bold">
          나의 좋아요 목록
        </h2>
        <div className="w-full border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              학원명
            </div>
            <div className="flex items-center justify-center w-20">
              삭제하기
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="w-full flex justify-start items-center">
              <div className="flex items-center gap-3">
                <img src="/aca_image_1.png" alt=" /" />
                ABCDEFG 어학원
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

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="w-full flex justify-start items-center">
              <div className="flex items-center gap-3">
                <img src="/aca_image_1.png" alt=" /" />
                ABCDEFG 어학원
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
        </div>

        <Pages
          perPage={5}
          totalPage={10}
          onPageChange={() => handlePageChange(1)}
        />

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
