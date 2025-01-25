import React, { useState } from "react";
import CustomInput from "../components/CustomInput ";
import MainButton from "../components/button/MainButton";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const popularSubjects = [
    { name: "수학", link: "/" },
    { name: "과학", link: "/" },
    { name: "영어", link: "/" },
    { name: "스페인어", link: "/" },
    { name: "프랑스어", link: "/" },
    { name: "중국어", link: "/" },
    { name: "피아노", link: "/" },
    { name: "바이올린", link: "/" },
    { name: "기타", link: "/" },
    { name: "음악", link: "/" },
    { name: "코딩", link: "/" },
    { name: "일본어", link: "/" },
  ];

  const pickAcademyCards = [
    {
      subject: "수학 학원",
      description: "Math, Algebra, Calculus",
      reviews: "5.0 (123 reviews)",
      questionsAnswered: "12,000 questions answered",
      link: "/",
    },
    {
      subject: "과학 학원",
      description: "Physics, Chemistry",
      reviews: "4.9 (87 reviews)",
      questionsAnswered: "9,000 questions answered",
      link: "/",
    },
    {
      subject: "영어 학원",
      description: "English, Grammar, ESL",
      reviews: "4.8 (56 reviews)",
      questionsAnswered: "7,500 questions answered",
      link: "/",
    },
    {
      subject: "외국어 학원",
      description: "Spanish, French, Italian",
      reviews: "4.7 (34 reviews)",
      questionsAnswered: "6,000 questions answered",
      link: "/",
    },
    {
      subject: "코딩 학원",
      description: "Programming, Web Development",
      reviews: "4.9 (45 reviews)",
      questionsAnswered: "5,500 questions answered",
      link: "/",
    },
  ];

  const bestAcademyCards = [
    {
      subject: "수학 학원",
      description: "Math, Algebra, Calculus",
      reviews: "5.0 (123 reviews)",
      questionsAnswered: "12,000 questions answered",
      link: "/",
    },
    {
      subject: "과학 학원",
      description: "Physics, Chemistry",
      reviews: "4.9 (87 reviews)",
      questionsAnswered: "9,000 questions answered",
      link: "/",
    },
    {
      subject: "영어 학원",
      description: "English, Grammar, ESL",
      reviews: "4.8 (56 reviews)",
      questionsAnswered: "7,500 questions answered",
      link: "/",
    },
    {
      subject: "외국어 학원",
      description: "Spanish, French, Italian",
      reviews: "4.7 (34 reviews)",
      questionsAnswered: "6,000 questions answered",
      link: "/",
    },
  ];

  const serviceStats = [
    {
      title: "Flexible scheduling",
      count: "2,999,254 명",
      icon: "clock-icon",
    },
    {
      title: "Trusted by millions",
      count: "1,322 개",
      icon: "trust-icon",
    },
    {
      title: "Expert tutors",
      count: "135,991 명",
      icon: "expert-icon",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center px-4 py-[36px] gap-8 mx-auto">
      {/* 메인 베너 */}
      <div className="w-full h-[480px] bg-gradient-to-b from-black/10 to-black/40 rounded-xl relative">
        <div className="absolute left-10 top-[216px] text-white">
          <h1 className="text-5xl font-black font-lexend mb-4">
            원하는 학원을 찾아보세요
          </h1>
          <p className="text-base font-normal">
            여러분의 학습 목표에 맞는 학원을 쉽고 빠르게 추천해 드립니다.
          </p>
        </div>
        <div className="absolute left-10 right-10 bottom-10 py-5 flex justify-center items-center w-[full]">
          <CustomInput
            placeholder="태그를 입력해 주세요"
            width="100%"
            height="64px"
            borderRadius="12px"
            padding="0 46px 0 36px"
            focusOutline="none"
            focusBorder="none"
            border="none"
          >
            <CiSearch className="text-[24px] font-bold  text-brand-placeholder absolute left-[10px] bottom-[40px] " />

            <MainButton
              className="py-5 text-white w-[95px] h-[48px] absolute right-[8px] bottom-[28px] z-10"
              onClick={handleButton1Click}
              type="primary"
            >
              검색
            </MainButton>
          </CustomInput>
        </div>
      </div>

      {/* 인기 태그 */}
      <div className="w-full max-w-[990px]">
        <h2 className="text-2xl font-bold mb-6">인기 태그</h2>
        <div className="flex flex-wrap gap-5 justify-start items-center">
          {popularSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-brand-BTWhite hover:bg-brand-BTWhiteHover px-4 py-1.5 rounded-xl flex-row-center cursor-pointer"
              onClick={() => navigate(subject.link)}
            >
              <span className="text-sm font-medium">{subject.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 이 학원은 어떠신가요? */}
      <div className="w-full max-w-[990px]">
        <h2 className="text-2xl font-bold mb-6">이 학원 어떠신가요?</h2>
        <div className="grid grid-cols-5 gap-[6]">
          {pickAcademyCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 cursor-pointer"
              onClick={() => navigate(card.link)}
            >
              <div className="w-[186px] h-[186px] bg-gray-200 rounded-xl"></div>
              <div>
                <h3 className="font-medium text-base">{card.subject}</h3>
                <p className="text-sm text-[#507A95]">{card.description}</p>
                <p className="text-sm text-[#507A95]">{card.reviews}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 서비스 현황 */}
      <div className="w-full max-w-[990px]">
        <h2 className="text-2xl font-bold font-lexend mb-7">서비스 현황</h2>
        <div className="grid grid-cols-3 gap-6">
          {serviceStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-4 bg-[#F8FAFB] border border-[#D1DDE6] rounded-lg"
            >
              <div className="w-6 h-6 bg-[#0E161B]">
                {/* 아이콘 컴포넌트 추가 필요 */}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0E161B]">
                  {stat.title}
                </h3>
                <p className="text-sm text-[#507A95]">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 화제가 되고 있는 학원 */}
      <div className="w-full max-w-[990px]">
        <h2 className="text-2xl font-bold font-lexend mb-7">
          화제가 되고 있는 학원
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {bestAcademyCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 cursor-pointer"
              onClick={() => navigate(card.link)}
            >
              <div className="h-56 bg-gray-200 rounded-xl">
                {/* 실제 이미지로 교체 필요 */}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-base text-[#0E161B]">
                  {card.subject}
                </h3>
                <div className="text-sm text-[#507A95]">
                  <p>{card.description}</p>
                  <p>{card.reviews}</p>
                  <p>{card.questionsAnswered}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
