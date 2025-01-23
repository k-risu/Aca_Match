import { Checkbox, Dropdown, Input, Menu, MenuProps, Pagination } from "antd";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import Pages from "../components/page/Pages";
import MainButton from "../components/button/MainButton";
import { DownOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import CustomInput from "../components/CustomInput ";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import LocationModal from "../components/modal/LocationModal";
import axios from "axios";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface AcademyData {
  image: string;
  name: string;
  tag: string;
  location: string;
  rating: string;
}
const DropdownButton = styled(MainButton)`
  border: 1px solid #dbe3e6 !important;
  &:hover {
    background-color: #c4d9e9 !important;
    border-color: #507a95 !important;
    border: 1px solid #dbe3e6 !important;
    color: #242424 !important;
  }
`;

const FilterCheckbox = ({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center p-3 px-[10px] gap-[11px]">
    <Checkbox checked={checked} onChange={e => onChange(e.target.checked)}>
      <span className="text-base text-brand-default">{label}</span>
    </Checkbox>
  </div>
);

const FilterBox = ({
  title,
  options,
  style,
  selectedValues,
  onValueChange,
}: {
  title: string;
  options: FilterOption[];
  style?: React.CSSProperties;
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="w-[288px] border border-brand-BTWhite rounded-xl p-[12px]"
      style={style}
    >
      {/* Header 부분 */}
      <div
        className="flex justify-between items-center w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-brand-default">{title}</span>
        <SlArrowDown
          className={`transition-transform duration-200 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </div>

      {/* Filter Options: 열림/닫힘에 따른 높이 조정 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isOpen ? `${options.length * 40}px` : "0", // 옵션 개수에 따라 동적 높이
        }}
      >
        {options.map(option => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={checked => onValueChange(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
};

const AcademySearch = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [selectedSearchType, setSelectedSearchType] = useState<string>("태그");
  const [currentPage, setCurrentPage] = useState(1);
  // const [visible, setVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  // const handleOpenModal = () => {
  //   setVisible(true);
  // };
  // const handleCloseModal = () => {
  //   setVisible(false);
  // };

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu
      onClick={({ key }) =>
        setSelectedSearchType(key === "1" ? "태그" : "검색어")
      }
    >
      <Menu.Item key="1">
        <span>태그</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>검색어</span>
      </Menu.Item>
    </Menu>
  );

  const filterSections: FilterSection[] = [
    {
      id: "age",
      title: "수강 연령",
      options: [
        { label: "성인", value: "adult" },
        { label: "청소년", value: "teenager" },
        { label: "초등학생", value: "elementary" },
        { label: "유아", value: "child" },
        { label: "기타", value: "etc" },
      ],
    },
    {
      id: "level",
      title: "수준",
      options: [
        { label: "전문가", value: "expert" },
        { label: "상급", value: "advanced" },
        { label: "중급", value: "intermediate" },
        { label: "초급", value: "beginner" },
        { label: "입문자", value: "novice" },
      ],
    },
  ];
  const academyData: AcademyData[] = [
    {
      image: "/images/academy1.png",
      name: "코딩키즈",
      tag: "코딩학원",
      location: "서울 강남구",
      rating: "4.8",
    },
    {
      image: "/images/academy2.png",
      name: "체육키즈",
      tag: "체육학원",
      location: "서울 서초구",
      rating: "4.5",
    },
    {
      image: "/images/academy3.png",
      name: "영어나라",
      tag: "어학원",
      location: "서울 송파구",
      rating: "4.9",
    },
    {
      image: "/images/academy4.png",
      name: "아트스쿨",
      tag: "미술학원",
      location: "서울 강동구",
      rating: "4.7",
    },
    {
      image: "/images/academy5.png",
      name: "축구교실",
      tag: "체육학원",
      location: "서울 마포구",
      rating: "4.6",
    },
    {
      image: "/images/academy6.png",
      name: "체스아카데미",
      tag: "교육학원",
      location: "서울 영등포구",
      rating: "4.3",
    },
    {
      image: "/images/academy7.png",
      name: "수영스쿨",
      tag: "체육학원",
      location: "서울 강서구",
      rating: "4.4",
    },
    {
      image: "/images/academy8.png",
      name: "로봇과학교실",
      tag: "과학학원",
      location: "서울 노원구",
      rating: "4.9",
    },
    {
      image: "/images/academy9.png",
      name: "발레아카데미",
      tag: "무용학원",
      location: "서울 종로구",
      rating: "4.6",
    },
    {
      image: "/images/academy10.png",
      name: "음악스쿨",
      tag: "음악학원",
      location: "서울 용산구",
      rating: "4.7",
    },
  ];
  const fetchData = (page: number) => {
    //axios 데이터 호출할 때 페이지당 갯수랑 페이지 번호 전달
    setTotalItems(10);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page); // 디버깅용 로그
    // 여기서 필요한 데이터 fetch 로직 추가
    fetchData(page);
  };

  // 필터 상태 관리
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    age: [],
    level: [],
  });

  // 개별 필터 값 변경 핸들러
  const handleFilterChange = (
    sectionId: string,
    value: string,
    checked: boolean,
  ) => {
    setSelectedFilters(prev => {
      const currentValues = prev[sectionId] || [];
      if (checked) {
        return {
          ...prev,
          [sectionId]: [...currentValues, value],
        };
      } else {
        return {
          ...prev,
          [sectionId]: currentValues.filter(v => v !== value),
        };
      }
    });
  };
  const SearchInput = styled(Input.Search)`
    .ant-input {
      height: 56px !important;
    }

    .ant-input-search-button {
      height: 56px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  const id = 123;
  const path = `/academy/detail?id=${id}`;

  return (
    <div className="flex flex-row justify-between w-full gap-[12px]">
      <div className="flex mt-[160px] ">
        <div className="flex-col-start gap-4 w-[288px] h-[916px]">
          <div className="flex items-start pb-5 pl-[15px] ">
            <h2 className="text-[24px] font-bold leading-[21px] text-brand-default">
              카테고리
            </h2>
          </div>

          <div className="flex flex-col gap-[8px]">
            {filterSections.map((section, index) => (
              <FilterBox
                key={section.id}
                title={section.title}
                options={section.options}
                selectedValues={selectedFilters[section.id] || []}
                onValueChange={(value, checked) =>
                  handleFilterChange(section.id, value, checked)
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 w-full mt-[65px]">
        {/* 상단 검색 영역 */}
        <div className="flex flex-row flex-wrap justify-between items-start gap-3 w-full h-[72px]">
          <div className="flex flex-col w-[288px] min-w-[288px] h-10">
            <h1 className="font-bold text-3xl text-brand-default">학원 검색</h1>
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="flex flex-row gap-3 w-full h-14">
          {/* 태그 검색 */}
          <div>
            <div className="flex justify-center items-center">
              {/* Dropdown 컴포넌트 */}
              <Dropdown overlay={menu} trigger={["click"]}>
                <DropdownButton
                  onClick={() => {}}
                  className="w-[100px] h-[56px] border-none flex items-center px-4 text-brand-default"
                >
                  {selectedSearchType} <DownOutlined />
                </DropdownButton>
              </Dropdown>
            </div>
          </div>
          <div className="relative">
            <SearchInput
              placeholder={`${selectedSearchType}를 입력해주세요`}
              className="border-none w-[395px] h-[56px]"
              size="large"
            />
            {/* <CiSearch className="text-[24px] font-bold  text-brand-placeholder absolute right-[10px] bottom-[15px] " /> */}
          </div>
          <div
            className="flex items-center text-brand-placeholder pl-[11px] w-[460px] h-[56px] bg-[#ffffff] border border-[#DBE3E6] rounded-[12px] justify-between pr-[10px] cursor-pointer"
            onClick={() => setIsModalVisible(true)}
          >
            <span>지역 검색</span>
            <SlArrowDown />
          </div>
          {/* <div className="w-5 h-5 bg-brand-default" /> */}
        </div>

        {/* 학원 목록 테이블 */}
        <div className="flex flex-col w-full border border-[#DBE3E6] rounded-xl">
          {/* 테이블 헤더 */}
          <div className="flex flex-row h-[46px] items-center justify-center">
            <span className="flex-row-center text-[14px] text-brand-default text-center w-full">
              학원
            </span>
            <span className="flex-row-center text-[14px] text-brand-default text-center min-w-[15%]">
              태그
            </span>
            <span className="flex-row-center text-[14px] text-brand-default text-center  min-w-[15%]">
              지역
            </span>
            <span className="flex-row-center text-[14px] text-brand-default text-center  min-w-[15%]">
              별점
            </span>
          </div>

          {/* 학원 목록 아이템 */}
          {academyData.map((academy, index) => (
            <div
              key={index}
              className="flex flex-row h-[72px] border-t border-[#DBE3E6]"
              onClick={() => navigate(path)}
            >
              <div className="flex justify-center items-center min-w-[10%]">
                <div
                  className="w-[60px] h-[60px] rounded-[20px] bg-cover"
                  style={{ backgroundColor: "#F0F2F5" }}
                  // style={{ backgroundImage: `url(${academy.image})` }}
                />
              </div>
              <div className="flex items-center p-4 w-full text-start">
                <span className="text-[14px] text-brand-default">
                  {academy.name}
                </span>
              </div>
              <div className="flex min-w-[15%] justify-center items-center p-4">
                <span className="text-[14px] text-brand-placeholder">
                  {academy.tag}
                </span>
              </div>
              <div className="flex min-w-[15%] justify-center items-center p-4">
                <span className="text-[14px] text-brand-placeholder">
                  {academy.location}
                </span>
              </div>
              <div className="flex min-w-[15%] justify-center items-center p-4">
                <div className="flex justify-center items-center px-4 h-8 bg-[#F0F2F5] rounded-xl">
                  <span className="text-[14px] font-medium text-brand-default">
                    {academy.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center items-center my-4">
          <Pagination
            current={currentPage}
            total={500} // 전체 아이템 수
            pageSize={10} // 페이지당 아이템 수
            onChange={handlePageChange}
            showSizeChanger={false} // 페이지 사이즈 변경 옵션 숨김
          />
        </div>
        <div className="flex w-full justify-center items-center">
          <Pages
            perPage={5}
            totalPage={10}
            onPageChange={() => handlePageChange(1)}
          />
        </div>
      </div>
      {isModalVisible && (
        <LocationModal
          visible={isModalVisible}
          handleCloseModal={() => handleButton1Click()}
        />
      )}
    </div>
  );
};

export default AcademySearch;
