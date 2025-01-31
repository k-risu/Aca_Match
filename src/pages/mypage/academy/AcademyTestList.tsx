import styled from "@emotion/styled";
import { Button, Pagination, Radio, RadioChangeEvent } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userInfo from "../../../atoms/userInfo";
import CustomModal from "../../../components/modal/Modal";
import SideBar from "../../../components/SideBar";

import { Form, Input } from "antd";

function AcademyTestList() {
  const [form] = Form.useForm();
  const currentUserInfo = useRecoilValue(userInfo);
  const [myAcademyTestList, setMyAcademyTestList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const acaId = searchParams.get("acaId");
  const classId = searchParams.get("classId");

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

  const TestList = styled.div`
    button {
      display: none;
    }
    .addOk button,
    .title-font button,
    .ant-form-item-control-input button {
      display: flex;
    }
  `;
  const AddTest = styled.div`
    input[type="text"] {
      margin-bottom: 15px;
    }
    div {
      display: flex;
      align-items: center;
      margin-bottom: 0px;
    }
    .ant-row,
    .ant-form-item-control-input {
      width: 100%;
    }
    .ant-col > label {
      width: 110px;
    }

    .ant-col > label::before {
      content: "" !important;
    }
    .ant-col > label::after {
      content: "*" !important;
      margin-top: 5px;
      color: #ff4400;
      font-size: 1.25rem;
    }
  `;

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const handleButton1Click2 = () => {
    setIsModal2Visible(false);
  };

  const handleButton2Click2 = () => {
    setIsModal2Visible(false);
  };

  const initialValues = {
    scoreType: 1,
    subjectName: "",
  };

  //전송하기
  const onFinished = async values => {
    values.classId = parseInt(classId);
    //console.log(values);
    const res = await axios.post("/api/subject", values);
    if (res.data.resultData === 1) {
      form.resetFields(); //초기화
      setIsModal2Visible(true);
      setIsModalVisible(false);
    }
  };

  const academyTestList = async () => {
    try {
      const res = await axios.get(
        `/api/grade/status?acaId=${acaId}&classId=${classId}`,
      );
      setMyAcademyTestList(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    academyTestList();
  }, []);

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <TestList className="w-full">
        <h1 className="title-font flex justify-between align-middle">
          "학원명 &gt; 강좌명"의 테스트 목록
          <button
            className="flex items-center gap-1 mr-5 text-sm font-normal"
            onClick={() => setIsModalVisible(true)}
          >
            테스트 신규등록
            <FaPlusCircle />
          </button>
        </h1>

        <div className="board-wrap">
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

          {myAcademyTestList === null && (
            <div className="loop-content w-full p-4 border-b text-center">
              등록된 테스트가 없습니다.
            </div>
          )}

          {myAcademyTestList?.map((item: never, index: number) => (
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
            total={myAcademyTestList?.length}
            showSizeChanger={false}
          />
        </div>

        <CustomModal
          visible={isModalVisible}
          title={"시험 등록"}
          content={
            <AddTest>
              <Form
                form={form}
                initialValues={initialValues}
                onFinish={values => onFinished(values)}
              >
                <Form.Item
                  name="scoreType"
                  label="채점 방식"
                  rules={[
                    { required: true, message: "채점 방식을 선택해 주세요." },
                  ]}
                >
                  <Radio.Group
                    value={radioValue}
                    options={[
                      {
                        value: 1,
                        label: "점수",
                      },
                      {
                        value: 2,
                        label: "합격 / 불합격",
                      },
                    ]}
                  />
                </Form.Item>

                <div className="flex w-full mt-3 mb-3">
                  <Form.Item
                    name="subjectName"
                    className="w-full"
                    rules={[
                      { required: true, message: "시험 제목을 입력해 주세요." },
                    ]}
                  >
                    <Input
                      className="input w-full h-14 border rounded-xl"
                      placeholder="시험 제목"
                    />
                  </Form.Item>
                </div>

                <div className="flex w-full gap-1 justify-between">
                  <Form.Item>
                    <Button
                      className="w-full h-14 bg-[#E8EEF3] text-sm"
                      onClick={() => setIsModalVisible(false)}
                    >
                      창닫기
                    </Button>
                  </Form.Item>

                  <Form.Item className="w-full">
                    <Button
                      htmlType="submit"
                      className="w-full h-14 bg-[#E8EEF3] text-sm"
                    >
                      등록하기
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </AddTest>
          }
          onButton1Click={handleButton1Click}
          onButton2Click={handleButton2Click}
          button1Text={"취소하기"}
          button2Text={"등록하기"}
          modalWidth={400}
        />

        <CustomModal
          visible={isModal2Visible}
          title={"시험 등록 완료"}
          content={
            <div className="addOk">
              시험 등록이 완료되었습니다.
              <button
                type="button"
                onClick={() => setIsModal2Visible(false)}
                className="w-full flex justify-center items-center rounded-xl h-14 mt-4 bg-[#E8EEF3] text-base"
              >
                닫기
              </button>
            </div>
          }
          onButton1Click={handleButton1Click2}
          onButton2Click={handleButton2Click2}
          button1Text={"취소하기"}
          button2Text={"등록하기"}
          modalWidth={400}
        />
      </TestList>
    </div>
  );
}

export default AcademyTestList;
