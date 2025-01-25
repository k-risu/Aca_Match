import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userInfo from "../../../atoms/userInfo";
import SideBar from "../../../components/SideBar";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

function AcademyRecord() {
  const currentUserInfo = useRecoilValue(userInfo);
  const [myAcademyList, setMyAcademyList] = useState([]);
  const navigate = useNavigate();

  const menuItems = [
    { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
    { label: "학원정보 관리", isActive: true, link: "/mypage/academy" },
    /*
    {
      label: "학원학생 관리",
      isActive: false,
      link: "/mypage/academy/student",
    },
    */
    {
      label: "학원리뷰 목록",
      isActive: false,
      link: "/mypage/academy/review",
    },
    { label: "좋아요 목록", isActive: false, link: "/mypage/academy/like" },
  ];

  const academyList = async () => {
    try {
      const res = await axios.get(
        `/api/academy/getAcademyListByUserId?signedUserId=${currentUserInfo.userId}`,
      );
      setMyAcademyList(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  //학원 상세보기 이동
  const detailAcademy = (acaId: number) => {
    navigate(`/academy/detail?id=${acaId}`);
  };

  useEffect(() => {
    academyList();
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h1 className="title-font flex justify-between align-middle">
          "강좌명 &gt; 테스트 명"의 수강생 목록
          <div className="flex items-center gap-1">
            <button
              className="flex items-center gap-1 mr-5 text-sm font-normal"
              onClick={() => navigate("/mypage/academy/classAdd")}
            >
              수강생 엑셀 다운로드
              <FaPlusCircle />
            </button>
            <button
              className="flex items-center gap-1 mr-5 text-sm font-normal"
              onClick={() => navigate("/mypage/academy/classAdd")}
            >
              테스트 결과 일괄등록
              <FaPlusCircle />
            </button>
          </div>
        </h1>
        <div className="w-full gap-0 border border-b-0 rounded-lg overflow-hidden">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              테스트 명
            </div>
            <div className="flex items-center justify-center w-60">등록일</div>
            <div className="flex items-center justify-center w-60">
              처리상태
            </div>
            <div className="flex items-center justify-center w-40">삭제</div>
          </div>

          {myAcademyList.map((item: never, index: number) => (
            <div
              key={index}
              className="loop-content flex justify-between align-middle p-4 border-b"
            >
              <div className="flex justify-start items-center w-full">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() =>
                    navigate(`/mypage/academy/record?id=${item.acaId}`)
                  }
                >
                  <img src="/aca_image_1.png" alt="" />
                  <div>
                    <h4 className="font-bold">1월 학원 모의고사</h4>
                    <p className="text-sm text-gray-500">[채점방식 : 점수]</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-60">
                2025-01-01
              </div>
              <div className="flex items-center justify-center w-60">
                채점 전/완료
              </div>
              <div className="flex items-center justify-center w-40">
                <button
                  className="small_line_button"
                  onClick={() => navigate("/mypage/academy/testList")}
                >
                  삭제하기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination
            defaultCurrent={1}
            total={myAcademyList.length}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default AcademyRecord;
