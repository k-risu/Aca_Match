import { Pagination } from "antd";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import SideBar from "../../components/SideBar";
import { getCookie } from "../../utils/cookie";
import { useRecoilValue } from "recoil";
import userInfo from "../../atoms/userInfo";

function MypageReview() {
  const currentUserInfo = useRecoilValue(userInfo);
  const accessToken = getCookie("accessToken");

  let menuItems = [];
  switch (currentUserInfo.roleId) {
    case 3: //학원 관계자
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        { label: "리뷰 목록", isActive: true, link: "/mypage/academy/review" },
        { label: "좋아요 목록", isActive: false, link: "/mypage/academy/like" },
      ];
      break;
    case 2: //학부모
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        { label: "리뷰 목록", isActive: true, link: "/mypage/review" },
        { label: "학생 관리", isActive: false, link: "/mypage/child" },
      ];
      break;
    default: //일반학생
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "나의 학원정보", isActive: false, link: "/mypage" },
        { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: true, link: "/mypage/review" },
      ];
  }

  const fetchData = (page: number) => {
    //axios 데이터 호출할 때 페이지당 갯수랑 페이지 번호 전달
    console.log(page);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h1 className="title-font">나의 리뷰 목록</h1>
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

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination defaultCurrent={1} total={100} showSizeChanger={false} />
        </div>
      </div>
    </div>
  );
}

export default MypageReview;
