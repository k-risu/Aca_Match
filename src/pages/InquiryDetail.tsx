import React from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import styled from "@emotion/styled";

function InquiryDetail() {
  const navigate = useNavigate();
  const menuItems = [
    { label: "FAQ", isActive: false, link: "/support" },
    { label: "1 : 1 문의", isActive: true, link: "/support/inquiry" },
  ];

  const chatMessages = [
    {
      id: 1,
      isUser: true,
      message: "안녕하세요. 학원 홈페이지 정보가 있어서요.",
    },
    {
      id: 2,
      isUser: false,
      message: [
        "네, 안녕하세요~ 편하게 질문 남겨주시면 좋아 주세요! 빠른 답변 드리도록 하겠습니다. 어떤 점이 궁금하실까요?",
      ],
    },
    {
      id: 3,
      isUser: true,
      message: [
        "예비 중3자녀가 있는데요, 특목고 입시 준비 중이라도요. 무료 수업번이 따로 있을까요? 있다면 교육 진행 방식이 궁금합니다. 자세 문은 거 있으시면 전달 부탁드려요",
      ],
    },
    {
      id: 4,
      isUser: false,
      message: [
        "네, 특목고 입시 준비 반이 따로 개설되어 있습니다! 더 자세한 내용은 말씀해오신 전달드리겠습니다 ㅎㅎ",
      ],
    },
    // 추가 메시지
    {
      id: 5,
      isUser: true,
      message: "감사합니다. 수업료는 어느 정도인가요?",
    },
    {
      id: 6,
      isUser: false,
      message: [
        "수업료는 주 2회 기준으로 월 30만원입니다. 첫 수업은 무료 체험으로 진행 가능하십니다.",
      ],
    },
    {
      id: 7,
      isUser: true,
      message: ["네, 이해했습니다. 무료 체험 수업은 언제든 가능한가요?"],
    },
    {
      id: 8,
      isUser: false,
      message: [
        "네, 평일 오후 2시부터 8시 사이에 가능합니다. 원하시는 시간대를 말씀해 주시면 예약 도와드리겠습니다.",
      ],
    },
  ];

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />
      <div className="flex flex-col w-full">
        <h1 className="title-font">1:1 학원별 문의</h1>
        <div
          className="flex items-center w-full py-4 text-white rounded-t-[12px] relative"
          style={{
            background:
              "linear-gradient(45deg, #3B77D8 0%, #4B89DC 50%, #69A7E4 100%)",
          }}
        >
          <button
            className="flex ml-2 mr-2 absolute left-0"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="flex mx-auto text-lg font-medium">
            체임학원 금곡점
          </span>
        </div>
        <div className="flex flex-col bg-[#4B89DC] h-[80vh] rounded-[12px]">
          {/* 채팅 컨테이너 */}
          <div className="flex flex-col h-full bg-gray-200">
            {/* 메시지 영역 */}
            <CustomScrollbar>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* {chatMessages.map(chat => (
                  <div
                    key={chat.id}
                    className={`flex ${chat.isUser ? "justify-end" : "gap-2"}`}
                  >
                    {!chat.isUser && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    )}
                    <div
                      className={`${
                        chat.isUser
                          ? "bg-[#4B89DC] text-white"
                          : "bg-gray-100 text-black"
                      } rounded-lg p-3 max-w-[70%]`}
                      style={
                        chat.isUser
                          ? {
                              background:
                                "linear-gradient(45deg, #3B77D8 0%, #4B89DC 50%, #69A7E4 100%)",
                            }
                          : {}
                      }
                    >
                      {Array.isArray(chat.message) ? (
                        chat.message.map((msg, index) => (
                          <p key={index} className="mb-1 last:mb-0">
                            {msg}
                          </p>
                        ))
                      ) : (
                        <p>{chat.message}</p>
                      )}
                    </div>
                  </div>
                ))} */}
                {chatMessages.map(chat => (
                  <div
                    key={chat.id}
                    className={`flex ${chat.isUser ? "justify-end" : "gap-2"}`}
                  >
                    {/* 학원 프로필 이미지 (사용자가 아닐 때만 표시) */}
                    {!chat.isUser && (
                      <div
                        className="w-10 h-10 rounded-full bg-white flex-shrink-0 bg-cover bg-center border border-gray-200"
                        style={{
                          backgroundImage: `url('/default_academy.jpg')`,
                        }}
                      />
                    )}

                    {/* 메시지 내용 */}
                    <div
                      className={`${
                        chat.isUser ? "text-white" : "bg-white text-black"
                      } rounded-lg p-3 max-w-[70%]`}
                      style={
                        chat.isUser
                          ? {
                              background:
                                "linear-gradient(45deg, #3B77D8 0%, #4B89DC 50%, #69A7E4 100%)",
                            }
                          : {}
                      }
                    >
                      {Array.isArray(chat.message) ? (
                        chat.message.map((msg, index) => (
                          <p key={index} className="mb-1 last:mb-0">
                            {msg}
                          </p>
                        ))
                      ) : (
                        <p>{chat.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CustomScrollbar>

            {/* 입력창 영역 - 하단 고정 */}
            <div className="p-4 bg-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="내용을 입력해 주세요."
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                />
                <button className="absolute right-[10px] bottom-[12px]">
                  <VscSend size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryDetail;

const CustomScrollbar = styled.div`
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px; /* 세로 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-track {
    /* background: #f1f1f1;  */
    background: none;
    border-radius: 10px; /* 스크롤바 트랙의 둥근 모서리 */
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb; /* 스크롤바 핸들의 색 */
    border-radius: 10px; /* 핸들의 둥근 모서리 */
    /* border: 3px solid #888; */
  }
`;
