import { Button, Pagination } from "antd";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomModal from "../components/modal/Modal";

function Inquiry() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menuItems = [
    { label: "FAQ", isActive: false, link: "/support" },
    { label: "1 : 1 문의", isActive: true, link: "/support/inquiry" },
  ];
  interface InquiryData {
    id: number;
    academyName: string;
    date: string;
    status: "처리중" | "답변완료";
    canCancel: boolean;
  }
  const academyData = [
    {
      id: 1,
      academyName: "코딩키즈",
      date: "2024-03-15",
      status: "처리중",
      canCancel: true,
    },
    {
      id: 2,
      academyName: "체육키즈",
      date: "2024-03-14",
      status: "답변완료",
      canCancel: false,
    },
    {
      id: 3,
      academyName: "영어나라",
      date: "2024-03-13",
      status: "완료",
      canCancel: false,
    },
    {
      id: 4,
      academyName: "아트스쿨",
      date: "2024-03-12",
      status: "취소",
      canCancel: false,
    },
    {
      id: 5,
      academyName: "축구교실",
      date: "2024-03-11",
      status: "처리중",
      canCancel: true,
    },
    {
      id: 6,
      academyName: "체스아카데미",
      date: "2024-03-10",
      status: "취소",
      canCancel: false,
    },
    {
      id: 7,
      academyName: "수영스쿨",
      date: "2024-03-09",
      status: "처리중",
      canCancel: true,
    },
    {
      id: 8,
      academyName: "로봇과학교실",
      date: "2024-03-08",
      status: "답변완료",
      canCancel: false,
    },
    {
      id: 9,
      academyName: "발레아카데미",
      date: "2024-03-07",
      status: "처리중",
      canCancel: true,
    },
    {
      id: 10,
      academyName: "음악스쿨",
      date: "2024-03-06",
      status: "답변완료",
      canCancel: false,
    },
  ];

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />
      <div className="flex flex-col w-full">
        <h1 className="title-font">1:1 학원별 문의</h1>
        <div className="flex flex-col w-full border border-[#DBE3E6] rounded-xl">
          {/* 테이블 헤더 */}
          <div className="flex flex-row h-[46px] items-center justify-center">
            <span className="flex-row-center text-[14px] text-brand-default text-center w-full">
              학원
            </span>
            <span className="flex-row-center text-[14px] text-brand-default text-center min-w-[15%]">
              날짜
            </span>
            <span className="flex-row-center text-[14px] text-brand-default text-center  min-w-[15%]">
              처리상태
            </span>
            <span className="flex-row-center text-[14px] text-brand-default text-center  min-w-[15%]">
              취소하기
            </span>
          </div>
          {academyData.map((academy, index) => (
            <div
              key={index}
              className="flex flex-row h-[72px] border-t border-[#DBE3E6]"
              onClick={() => navigate("/support/inquiry/detail")}
            >
              <div className="flex justify-center items-center min-w-[10%]">
                <div
                  className="w-[60px] h-[60px] rounded-[20px] bg-cover"
                  // style={{ backgroundColor: "#F0F2F5" }}
                  // style={{ backgroundImage: `url(${academy.image})` }}
                  style={{ backgroundImage: `url('/default_academy.jpg')` }}
                />
              </div>
              <div className="flex items-center p-4 w-full text-start">
                <span className="text-[14px] text-brand-default">
                  {academy.academyName}
                </span>
              </div>
              <div className="flex min-w-[15%] justify-center items-center p-4">
                <span className="text-[14px] text-brand-placeholder">
                  {academy.date}
                </span>
              </div>
              <div className="flex min-w-[15%] justify-center items-center p-4">
                <div
                  className={`flex justify-center items-center px-4 h-8 rounded-xl ${
                    academy.status === "처리중"
                  }`}
                >
                  <span className="text-[14px] font-medium">
                    {academy.status}
                  </span>
                </div>
              </div>
              <div className="flex min-w-[15%] justify-center items-center p-4">
                {academy.canCancel ? (
                  <button
                    className="small_line_button"
                    onClick={e => {
                      e.stopPropagation(); // 이벤트 전파 중지
                      setIsModalVisible(true);
                    }}
                  >
                    취소하기
                  </button>
                ) : (
                  <button
                    className="small_line_button bg-gray-200 opacity-50"
                    disabled
                    onClick={e => e.stopPropagation()}
                  >
                    취소하기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center m-6">
          <Pagination
            // current={currentPage}
            total={500} // 전체 아이템 수
            pageSize={10} // 페이지당 아이템 수
            // onChange={handlePageChange}
            showSizeChanger={false} // 페이지 사이즈 변경 옵션 숨김
          />
        </div>
      </div>
      {isModalVisible && (
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
      )}
    </div>
  );
}

export default Inquiry;
