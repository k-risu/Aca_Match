import { useEffect, useState } from "react";
import Pages from "../../components/page/Pages";
import SideBar from "../../components/SideBar";

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/" },
  { label: "나의 학원정보", isActive: false, link: "/mypage" },
  { label: "나의 성적확인", isActive: true, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
];

function MyPageRecord() {
  const [totalItems, setTotalItems] = useState(0);

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
          나의 성적확인
        </h2>
        <div className="w-full border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              학원명
            </div>
            <div className="flex items-center justify-center w-60">
              테스트일
            </div>
            <div className="flex items-center justify-center w-60">
              처리상태
            </div>
            <div className="flex items-center justify-center w-60">
              성적확인
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="flex justify-start items-center w-full">
              <div className="flex items-center">
                <img src="" alt=" /" />
                ABCDEFG 어학원
              </div>
            </div>
            <div className="flex items-center justify-center w-60">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-60">
              채점완료
            </div>
            <div className="flex items-center justify-center w-60">
              <button className="small_line_button">수정하기</button>
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-4 border-b">
            <div className="flex justify-start items-center w-full">
              <div className="flex items-center">
                <img src="" alt=" /" />
                ABCDEFG 어학원
              </div>
            </div>
            <div className="flex items-center justify-center w-60">
              2025-01-01
            </div>
            <div className="flex items-center justify-center w-60">채점전</div>
            <div className="flex items-center justify-center w-60">
              <button className="small_line_button">수정하기</button>
            </div>
          </div>
        </div>

        <Pages
          perPage={5}
          totalPage={10}
          onPageChange={() => handlePageChange(1)}
        />
      </div>
    </div>
  );
}

export default MyPageRecord;
