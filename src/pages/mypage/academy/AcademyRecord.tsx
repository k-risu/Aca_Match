import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userInfo from "../../../atoms/userInfo";
import SideBar from "../../../components/SideBar";
import { Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import CustomModal from "../../../components/modal/Modal";

function AcademyRecord() {
  const currentUserInfo = useRecoilValue(userInfo);
  const [testStudentList, setTestStudentList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const acaId = searchParams.get("acaId");
  const classId = searchParams.get("classId");
  const subjectId = searchParams.get("subjectId");

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

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };
  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const handle2Button1Click = () => {
    setIsModalVisible2(false);
  };
  const handle2Button2Click = async () => {
    const res = await axios.get(`/api/grade/export?subjectId=${subjectId}`);
    console.log(res.data);
    setIsModalVisible2(false);
  };

  const handle3Button1Click = () => {
    setIsModalVisible3(false);
  };
  const handle3Button2Click = () => {
    setIsModalVisible3(false);
  };

  //점수 수정하기 모달창 오픈
  const handleRecordEdit = () => {
    setIsModalVisible(true);
  };

  //수강생 다운로드 모달창 오픈
  const handleStudentDownload = () => {
    setIsModalVisible2(true);
  };

  //점수 일괄 업로드 모달창 오픈
  const handleScoreUpload = () => {
    setIsModalVisible3(true);
  };

  const academyStudentList = async () => {
    try {
      const res = await axios.get(
        `/api/grade/gradeUser?acaId=${acaId}&joinClassId=${classId}&subjectId=${subjectId}`,
      );
      setTestStudentList(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    academyStudentList();
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
              onClick={() => handleStudentDownload()}
            >
              수강생 엑셀 다운로드
              <FaPlusCircle />
            </button>
            <button
              className="flex items-center gap-1 mr-5 text-sm font-normal"
              onClick={() => handleScoreUpload()}
            >
              테스트 결과 일괄등록
              <FaPlusCircle />
            </button>
          </div>
        </h1>

        <div className="board-wrap">
          <div className="flex justify-between align-middle p-4 border-b">
            <div className="flex items-center justify-center w-full">
              수강생 명
            </div>
            <div className="flex items-center justify-center w-60">
              테스트 일
            </div>
            <div className="flex items-center justify-center w-60">점수</div>
            <div className="flex items-center justify-center w-40">
              수정하기
            </div>
          </div>

          {testStudentList.map((item: never, index: number) => (
            <div
              key={index}
              className="loop-content flex justify-between align-middle p-4 border-b"
            >
              <div className="flex justify-start items-center w-full">
                <div className="flex items-center gap-3 cursor-pointer">
                  <img src="/aca_image_1.png" alt="" />
                  {item.userName}
                </div>
              </div>
              <div className="flex items-center justify-center w-60">
                {item.examDate}
              </div>
              <div className="flex items-center justify-center w-60">
                {item.pass !== null ? item.pass : item.score + "점"}
              </div>
              <div className="flex items-center justify-center w-40">
                <button
                  className="small_line_button"
                  onClick={() => handleRecordEdit()}
                >
                  수정하기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination
            defaultCurrent={1}
            total={testStudentList.length}
            showSizeChanger={false}
          />
        </div>
      </div>

      <CustomModal
        visible={isModalVisible}
        title={"점수 수정"}
        content={
          <div>
            <input
              type="text"
              name="record"
              placeholder="점수를 입력해 주세요."
              className="w-full h-14 pl-3 border rounded-xl text-sm"
            />
          </div>
        }
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
        button1Text={"취소하기"}
        button2Text={"수정하기"}
        modalWidth={400}
      />

      <CustomModal
        visible={isModalVisible2}
        title={"수강생 다운로드"}
        content={"수강생 목록을 다운로드 받으시겠습니까?"}
        onButton1Click={handle2Button1Click}
        onButton2Click={handle2Button2Click}
        button1Text={"취소하기"}
        button2Text={"다운로드"}
        modalWidth={400}
      />

      <CustomModal
        visible={isModalVisible3}
        title={"점수 일괄 업로드"}
        content={
          <div>
            <h4 className="mb-2">업로드하실 파일을 선택해 주세요.</h4>
            <div>
              <input
                type="file"
                name="add-record"
                className="w-full h-14 pl-3 border rounded-xl text-sm"
              />
            </div>
          </div>
        }
        onButton1Click={handle3Button1Click}
        onButton2Click={handle3Button2Click}
        button1Text={"취소하기"}
        button2Text={"업로드하기"}
        modalWidth={400}
      />
    </div>
  );
}

export default AcademyRecord;
