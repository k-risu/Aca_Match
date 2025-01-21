import { useEffect, useState } from "react";
import Pages from "../../components/page/Pages";
import SideBar from "../../components/SideBar";
import CustomModal from "../../components/modal/Modal";

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
  { label: "나의 학원정보", isActive: true, link: "/mypage" },
  { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
];

function MyPage() {
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
          나의 학원정보
        </h2>
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

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="flex justify-start items-center w-full">
              <div className="flex items-center gap-3">
                <img src="aca_image_1.png" alt=" /" />
                ABCDEFG 어학원
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

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="w-full flex justify-start items-center">
              <div className="flex items-center gap-3">
                <img src="aca_image_1.png" alt=" /" />
                ABCDEFG 어학원
              </div>
            </div>
            <div className="flex items-center justify-center w-60">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-40">처리중</div>
            <div className="flex items-center justify-center w-40">
              <button
                className="small_line_button"
                onClick={() => setIsModalVisible(true)}
              >
                취소하기
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
