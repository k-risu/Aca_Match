import { useEffect, useState } from "react";
import Leftmenu from "../../components/left/LeftMenu";
import Pages from "../../components/page/Pages";

const leftMenu = [
  {
    text: "회원정보 관리",
    link: "memberlist",
  },
  { text: "학원정보 관리", link: "academylist" },
  { text: "리뷰 목록", link: "reviewlist" },
  { text: "학생 관리", link: "studentlist" },
];

function MyPage() {
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
    <div className="flex">
      <Leftmenu title={"마이페이지"} leftMenu={leftMenu} />
      <div>
        <h2 className="flex items-center justify-between pb-3 text-2xl font-bold">
          학원정보 관리
          <button className="bg-white border-2 border-gray-300 rounded-md px-2 py-1 text-sm">
            학원등록하기
          </button>
        </h2>
        <table className="w-full border-2 rounded-lg">
          <colgroup>
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
          </colgroup>
          <thead>
            <tr className="border-2">
              <th>학원명</th>
              <th>등록일</th>
              <th>처리상태</th>
              <th>강좌등록</th>
              <th>수정하기</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-2">
              <td>
                <div className="flex items-center">
                  <img src="" alt=" /" />
                  ABCDEFG 어학원
                </div>
              </td>
              <td className="text-center">2025-01-01</td>
              <td className="text-center">처리중</td>
              <td className="text-center">
                <button
                  type="button"
                  className="bg-white border-2 border-gray-300 px-2 py-1 rounded-md"
                >
                  강좌등록
                </button>
              </td>
              <td className="text-center">
                <button className="bg-white border-2 border-gray-300 px-2 py-1 rounded-md">
                  수정하기
                </button>
              </td>
            </tr>

            <tr className="border-2">
              <td>
                <div className="flex items-center">
                  <img src="" alt=" /" />
                  ABCDEFG 어학원
                </div>
              </td>
              <td className="text-center">2025-01-01</td>
              <td className="text-center">처리중</td>
              <td className="text-center">
                <button
                  type="button"
                  className="bg-white border-2 border-gray-300 px-2 py-1 rounded-md"
                >
                  강좌등록
                </button>
              </td>
              <td className="text-center">
                <button className="bg-white border-2 border-gray-300 px-2 py-1 rounded-md">
                  수정하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <Pages
          perPage={5}
          totalPage={10}
          onPageChange={() => handlePageChange(1)}
        />
      </div>
    </div>
  );
}

export default MyPage;
