import { useEffect, useState } from "react";
import Pages from "../../components/page/Pages";
import SideBar from "../../components/SideBar";
import { FaStar } from "react-icons/fa";

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
  { label: "나의 학원정보", isActive: false, link: "/mypage" },
  { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
  { label: "나의 리뷰 목록", isActive: true, link: "/mypage/review" },
];

function MypageReview() {
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
          나의 리뷰 목록
        </h2>
        <div className="w-full border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              리뷰 내용
            </div>
            <div className="flex items-center justify-center w-40">
              수정하기
            </div>
            <div className="flex items-center justify-center w-40">
              삭제하기
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-6 border-b">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/aca_image_1.png" alt=" /" />
                </div>
                <div>
                  <div className="text-sm font-medium">ABCDEFG 어학원</div>
                  <div className="text-sm text-gray-500">2025-01-01</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 mb-3">
                <FaStar className="text-blue-500" />
                <FaStar className="text-blue-500" />
                <FaStar className="text-blue-500" />
                <FaStar className="text-blue-500" />
                <FaStar className="text-black-500" />
              </div>
              <div className="text-lg font-bold">ABCDEFG 대구 어학원</div>
              <div className="text-sm text-gray-500">
                제 아들은 1년 동안 Little Explorers에 갔는데 긍정적인 경험밖에
                없었습니다. 직원들은 세심하고 전문적입니다. 커리큘럼은 발달에
                적합하고 매력적입니다. 나는 다른 부모들에게 이 유치원을 적극
                추천합니다.
              </div>
            </div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">수정하기</button>
            </div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">삭제하기</button>
            </div>
          </div>

          <div className="loop-content flex justify-between align-middle p-6 border-b">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/aca_image_1.png" alt=" /" />
                </div>
                <div>
                  <div className="text-sm font-medium">ABCDEFG 어학원</div>
                  <div className="text-sm text-gray-500">2025-01-01</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 mb-3">
                <FaStar className="text-blue-500" />
                <FaStar className="text-blue-500" />
                <FaStar className="text-blue-500" />
                <FaStar className="text-blue-500" />
                <FaStar className="text-black-500" />
              </div>
              <div className="text-lg font-bold">ABCDEFG 대구 어학원</div>
              <div className="text-sm text-gray-500">
                제 아들은 1년 동안 Little Explorers에 갔는데 긍정적인 경험밖에
                없었습니다. 직원들은 세심하고 전문적입니다. 커리큘럼은 발달에
                적합하고 매력적입니다. 나는 다른 부모들에게 이 유치원을 적극
                추천합니다.
              </div>
            </div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">수정하기</button>
            </div>
            <div className="flex items-center justify-center w-40">
              <button className="small_line_button">삭제하기</button>
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

export default MypageReview;
