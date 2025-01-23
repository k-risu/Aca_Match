import { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Pagination } from "antd";

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
  { label: "나의 학원정보", isActive: false, link: "/mypage" },
  { label: "나의 성적확인", isActive: true, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
  { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
];

function MyPageRecord() {
  const fetchData = (page: number) => {
    console.log(page);
    //axios 데이터 호출할 때 페이지당 갯수랑 페이지 번호 전달
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h1 className="title-font">나의 성적확인</h1>
        <div className="w-full border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              학원명
            </div>
            <div className="flex items-center justify-center w-60">
              테스트일
            </div>
            <div className="flex items-center justify-center w-40">
              처리상태
            </div>
            <div className="flex items-center justify-center w-40">
              성적확인
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="flex justify-start items-center w-full">
              <div className="flex items-center gap-3">
                <img src="/aca_image_1.png" alt=" /" />
                ABCDEFG 어학원
              </div>
            </div>
            <div className="flex items-center justify-center w-60">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-40">
              채점완료
            </div>
            <div className="flex items-center justify-center w-40">
              <span className="small_line_button bg-gray-200 opacity-50">
                성적확인
              </span>
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="flex justify-start items-center w-full">
              <div className="flex items-center gap-3">
                <img src="/aca_image_1.png" alt=" /" />
                ABCDEFG 어학원
              </div>
            </div>
            <div className="flex items-center justify-center w-60">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-40">채점전</div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">성적확인</button>
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

export default MyPageRecord;
