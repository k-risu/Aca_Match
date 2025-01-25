import { Button } from "antd";
import SideBar from "../components/SideBar";

function Inquiry() {
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

  // TypeScript 타입 정의

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />
      <div className="flex flex-col w-full">
        <h1 className="title-font">나의 학원정보</h1>
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
            >
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
                    onClick={() => setIsModalVisible(true)}
                  >
                    취소하기
                  </button>
                ) : (
                  <button
                    className="small_line_button bg-gray-200 opacity-50"
                    disabled
                  >
                    취소하기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
